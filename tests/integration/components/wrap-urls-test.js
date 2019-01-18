import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, findAll } from '@ember/test-helpers';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { text } from 'dummy/utils/samples';
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import Component from '@ember/component';
import WrapUrlsComponent from '@zestia/ember-wrap-urls/components/wrap-urls';
const { escapeExpression } = Ember.Handlebars.Utils;
const { from } = Array;

module('Integration | Component | wrap urls', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.getText = selector => from(findAll(selector)).map(el => el.textContent);
  });

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`{{wrap-urls}}`);

    assert.equal(this.element.innerHTML, '<!---->', 'renders as a tagless component');

    await render(hbs`{{#wrap-urls}}foo{{/wrap-urls}}`);

    assert.equal(this.element.innerHTML, '<!---->', 'no block mode');
  });

  test('escaping', async function(assert) {
    assert.expect(1);

    await render(hbs`{{wrap-urls text="<script>"}}`);

    assert.equal(this.element.innerHTML, '&lt;script&gt;', 'text is escaped');
  });

  test('null text', async function(assert) {
    assert.expect(1);

    this.set('text', null);

    await render(hbs`{{wrap-urls text=this.text}}`);

    assert.equal(this.element.innerHTML, '<!---->', 'does not blow up');
  });

  test('safe strings', async function(assert) {
    assert.expect(2);

    this.owner.register(
      'helper:truncate',
      helper(function(args) {
        const [string, length] = args;
        return htmlSafe(escapeExpression(string.slice(0, length)));
      })
    );

    await render(hbs`{{wrap-urls text=(truncate "visit http://example.com" 16)}}`);

    assert.dom(this.element).hasText('visit http://exa');

    assert.deepEqual(this.getText('.wrapped-url'), ['http://exa']);
  });

  test('it wraps urls', async function(assert) {
    assert.expect(2);

    this.set('text', text);

    await render(hbs`{{wrap-urls text=this.text}}`);

    assert.dom(this.element).hasText(text);

    assert.deepEqual(this.getText('.wrapped-url'), [
      'http://foo.com',
      'https://bar.com',
      'ftp://baz.com',
      'file://qux.jpg',
      'http://norf.com',
      'http://foo.bar.com',
      'http://foo.com/bar/baz',
      'http://foo.com',
      'https://bar.com'
    ]);
  });

  test('it wraps urls as links', async function(assert) {
    assert.expect(2);

    this.set('text', text);

    await render(hbs`{{wrap-urls text=this.text component="wrap-urls/link"}}`);

    assert.dom(this.element).hasText(text);

    assert.deepEqual(this.getText('.wrapped-url-link'), [
      'http://foo.com',
      'https://bar.com',
      'ftp://baz.com',
      'file://qux.jpg',
      'http://norf.com',
      'http://foo.bar.com',
      'http://foo.com/bar/baz',
      'http://foo.com',
      'https://bar.com'
    ]);
  });

  test('custom component', async function(assert) {
    assert.expect(2);

    const XFooComponent = Component.extend({
      attributeBindings: ['target'],
      layout: hbs`{{url}}`
    });

    this.owner.register('component:x-foo', XFooComponent);

    await render(hbs`
      {{~wrap-urls
        text="visit http://my http://link"
        component=(component "x-foo" target="foo")~}}
    `);

    assert.dom(this.element).hasText('visit http://my http://link');

    assert.deepEqual(this.getText('[target="foo"]'), ['http://my', 'http://link']);
  });

  test('custom pattern', async function(assert) {
    assert.expect(2);

    const originalRegex = WrapUrlsComponent.regex;

    WrapUrlsComponent.reopenClass({
      regex: /mailto:(.*)?/g
    });

    await render(hbs`{{wrap-urls text="email me mailto:fred@smith.com"}}`);

    assert.dom(this.element).hasText('email me mailto:fred@smith.com');

    assert.deepEqual(this.getText('.wrapped-url'), ['mailto:fred@smith.com']);

    WrapUrlsComponent.regex = originalRegex;
  });

  test('re-computing', async function(assert) {
    assert.expect(4);

    this.set('text', 'http://foo.com');

    await render(hbs`{{wrap-urls text=this.text}}`);

    assert.dom(this.element).hasText('http://foo.com');

    assert.deepEqual(this.getText('.wrapped-url'), ['http://foo.com']);

    this.set('text', 'http://bar.com');

    assert.dom(this.element).hasText('http://bar.com');

    assert.deepEqual(this.getText('.wrapped-url'), ['http://bar.com']);
  });

  test('start and end properties', async function(assert) {
    assert.expect(1);

    const MyLinkComponent = Component.extend({
      classNames: ['my-link'],
      layout: hbs`{{start}} {{url}} {{end}}`
    });

    this.owner.register('component:my-link', MyLinkComponent);

    await render(hbs`
      {{~wrap-urls
        text="One: http://one.com Two: http://two.com"
        component=(component "my-link")~}}
    `);

    assert.deepEqual(
      this.getText('.my-link'),
      ['5 http://one.com 19', '25 http://two.com 39'],
      'start and end of url position is passed to the component'
    );
  });

  skip('issue: https://github.com/emberjs/ember.js/issues/17458', async function(assert) {
    assert.expect(0);

    this.set('text', 'http://emberjs.com');

    this.set('viewMore', () => {
      this.set('text', 'Visit: http://emberjs.com');
    });

    await render(hbs`
      {{wrap-urls text=this.text}}

      <button onclick={{action this.viewMore}}>View more</button>
    `);

    // Mimic what Google Translate does
    const url = find('.wrapped-url');
    const wrapper = document.createElement('font');

    url.parentNode.insertBefore(wrapper, url);
    wrapper.appendChild(url);

    await click('button');
  });
});
