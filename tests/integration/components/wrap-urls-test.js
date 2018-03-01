import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { text } from 'dummy/utils/samples';
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import Component from '@ember/component';
import WrapUrlsComponent from '@zestia/ember-wrap-urls/components/wrap-urls';
const { escapeExpression } = Ember.Handlebars.Utils;

module('Integration | Component | wrap urls', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.getText = selector => {
      return this.$(selector).map((i, el) => el.textContent).toArray();
    };
  });

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`{{wrap-urls}}`);

    assert.equal(this.$().html(), '<!---->',
      'renders as a tagless component');

    await render(hbs`{{#wrap-urls}}foo{{/wrap-urls}}`);

    assert.equal(this.$().html(), '<!---->',
      'no block mode');
  });

  test('escaping', async function(assert) {
    assert.expect(1);

    await render(hbs`{{wrap-urls text="<script>"}}`);

    assert.equal(this.$().html(), '&lt;script&gt;',
      'text is escaped');
  });

  test('null text', async function(assert) {
    assert.expect(1);

    this.set('text', null);

    await render(hbs`{{wrap-urls text=text}}`);

    assert.equal(this.$().html(), '<!---->',
      'does not blow up');
  });

  test('safe strings', async function(assert) {
    assert.expect(2);

    this.owner.register('helper:truncate', helper(function(args) {
      const [ string, length ] = args;
      return htmlSafe(escapeExpression(string.slice(0, length)));
    }));

    await render(hbs`{{wrap-urls text=(truncate 'visit http://example.com' 16)}}`);

    assert.equal(this.$().text(), 'visit http://exa');

    assert.deepEqual(this.getText('.wrapped-url'), ['http://exa']);
  });

  test('it wraps urls', async function(assert) {
    assert.expect(2);

    this.set('text', text);

    await render(hbs`{{wrap-urls text=text}}`);

    assert.equal(this.$().text(), text);

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

    await render(hbs`{{wrap-urls text=text component="wrap-urls/link"}}`);

    assert.equal(this.$().text(), text);

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
        component=(component 'x-foo' target="foo")~}}
    `);

    assert.equal(this.$().text(), 'visit http://my http://link');

    assert.deepEqual(this.getText('[target="foo"]'), [
      'http://my',
      'http://link'
    ]);
  });

  test('custom pattern', async function(assert) {
    assert.expect(2);

    const originalRegex = WrapUrlsComponent.regex;

    WrapUrlsComponent.reopenClass({
      regex: /mailto:(.*)?/g
    });

    await render(hbs`{{wrap-urls text="email me mailto:fred@smith.com"}}`);

    assert.equal(this.$().text(), 'email me mailto:fred@smith.com');

    assert.deepEqual(this.getText('.wrapped-url'), ['mailto:fred@smith.com']);

    WrapUrlsComponent.regex = originalRegex;
  });

  test('re-computing', async function(assert) {
    assert.expect(4);

    this.set('text', 'http://foo.com');

    await render(hbs`{{wrap-urls text=text}}`);

    assert.equal(this.$().text(), 'http://foo.com');

    assert.deepEqual(this.getText('.wrapped-url'), ['http://foo.com']);

    this.set('text', 'http://bar.com');

    assert.equal(this.$().text(), 'http://bar.com');

    assert.deepEqual(this.getText('.wrapped-url'), ['http://bar.com']);
  });
});
