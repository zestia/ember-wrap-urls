import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { text } from 'dummy/utils/samples';
import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';

module('Integration | Component | wrap urls', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    await render(hbs`<WrapUrls />`);

    assert.equal(
      this.element.innerHTML,
      '<!---->',
      'renders as a tagless component'
    );

    await render(hbs`<WrapUrls>foo</WrapUrls>`);

    assert.equal(this.element.innerHTML, '<!---->', 'no block mode');
  });

  test('escaping', async function (assert) {
    assert.expect(1);

    await render(hbs`<WrapUrls @text="<script>" />`);

    assert.equal(this.element.innerHTML, '&lt;script&gt;', 'text is escaped');
  });

  test('null text', async function (assert) {
    assert.expect(1);

    this.text = null;

    await render(hbs`<WrapUrls @text={{this.text}} />`);

    assert.equal(this.element.innerHTML, '<!---->', 'does not blow up');
  });

  test('it wraps urls', async function (assert) {
    assert.expect(1);

    this.text = text;

    await render(hbs`<WrapUrls @text={{this.text}} />`);

    assert.equal(
      this.element.innerHTML,
      'http: <span class="wrapped-url">http://foo.com</span>\n' +
        'https: <span class="wrapped-url">https://bar.com</span>\n' +
        'ftp: <span class="wrapped-url">ftp://baz.com</span>\n' +
        'file: <span class="wrapped-url">file://qux.jpg</span>\n' +
        'emoji: 🔗<span class="wrapped-url">http://norf.com</span>\n' +
        'subdomain: <span class="wrapped-url">http://foo.bar.com</span>\n' +
        'path: <span class="wrapped-url">http://foo.com/bar/baz</span>\n' +
        'query: <span class="wrapped-url">http://foo.com?bar=baz</span>\n' +
        'close together: <span class="wrapped-url">http://foo.com</span> <span class="wrapped-url">https://bar.com</span>'
    );
  });

  test('it wraps urls as links', async function (assert) {
    assert.expect(1);

    this.text = text;

    await render(
      hbs`<WrapUrls @Url={{component "wrap-urls/link"}} @text={{this.text}} />`
    );

    assert.equal(
      this.element.innerHTML,
      'http: <a href="http://foo.com" class="wrapped-url-link">http://foo.com</a>\n' +
        'https: <a href="https://bar.com" class="wrapped-url-link">https://bar.com</a>\n' +
        'ftp: <a href="ftp://baz.com" class="wrapped-url-link">ftp://baz.com</a>\n' +
        'file: <a href="file://qux.jpg" class="wrapped-url-link">file://qux.jpg</a>\n' +
        'emoji: 🔗<a href="http://norf.com" class="wrapped-url-link">http://norf.com</a>\n' +
        'subdomain: <a href="http://foo.bar.com" class="wrapped-url-link">http://foo.bar.com</a>\n' +
        'path: <a href="http://foo.com/bar/baz" class="wrapped-url-link">http://foo.com/bar/baz</a>\n' +
        'query: <a href="http://foo.com?bar=baz" class="wrapped-url-link">http://foo.com?bar=baz</a>\n' +
        'close together: <a href="http://foo.com" class="wrapped-url-link">http://foo.com</a> <a href="https://bar.com" class="wrapped-url-link">https://bar.com</a>'
    );
  });

  test('safe strings', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{! template-lint-disable no-triple-curlies }}
      <WrapUrls @text={{{"visit https://example.com"}}} />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      'visit <span class="wrapped-url">https://example.com</span>'
    );
  });

  skip('it forwards attributes', async function (assert) {
    assert.expect(1);

    // Not working due to splattributes not forwarding with component helper

    this.text = text;

    await render(hbs`
      <WrapUrls
        @Url={{component "wrap-urls/link" target="_blank"}}
        @text={{this.text}}
      />
    `);

    assert.dom('a[target="_blank"]').exists({ count: 9 });
  });

  test('custom component', async function (assert) {
    assert.expect(1);

    const foo = hbs`<a href={{@url.string}} target="foo">{{@url.string}}</a>`;

    const Foo = class extends Component {};

    this.Foo = setComponentTemplate(foo, Foo);

    await render(hbs`
      <WrapUrls
        @Url={{this.Foo}}
        @text="visit http://my http://link"
      />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      'visit <a href="http://my" target="foo">http://my</a> <a href="http://link" target="foo">http://link</a>'
    );
  });

  test('custom pattern', async function (assert) {
    assert.expect(1);

    this.pattern = /mailto:(.*)?/g;

    await render(hbs`
      <WrapUrls
        @pattern={{this.pattern}}
        @text="email me mailto:fred@smith.com"
      />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      'email me <span class="wrapped-url">mailto:fred@smith.com</span>'
    );
  });

  test('re-computing', async function (assert) {
    assert.expect(2);

    this.text = 'http://foo.com';

    await render(hbs`<WrapUrls @text={{this.text}} />`);

    assert.equal(
      this.element.innerHTML,
      '<span class="wrapped-url">http://foo.com</span>'
    );

    this.set('text', 'http://bar.com');

    assert.equal(
      this.element.innerHTML,
      '<span class="wrapped-url">http://bar.com</span>'
    );
  });

  test('start and end properties', async function (assert) {
    assert.expect(1);

    const myLink = hbs`<div class="my-link">{{@url.start}} {{@url.string}} {{@url.end}}</div>`;

    const MyLink = class extends Component {};

    this.MyLink = setComponentTemplate(myLink, MyLink);

    await render(hbs`
      <WrapUrls
        @Url={{this.MyLink}}
        @text="One: http://one.com Two: http://two.com"
      />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      'One: <div class="my-link">5 http://one.com 19</div> Two: <div class="my-link">25 http://two.com 39</div>'
    );
  });

  test('issue: https://github.com/emberjs/ember.js/issues/17458', async function (assert) {
    assert.expect(0);

    this.text = 'http://emberjs.com';

    this.viewMore = () => this.set('text', 'Visit: http://emberjs.com');

    await render(hbs`
      <WrapUrls @text={{this.text}} />

      <button type="button" {{on "click" this.viewMore}}>View more</button>
    `);

    // Mimic what Google Translate does
    const url = find('.wrapped-url');
    const wrapper = document.createElement('font');

    url.parentNode.insertBefore(wrapper, url);
    wrapper.appendChild(url);

    await click('button');
  });
});
