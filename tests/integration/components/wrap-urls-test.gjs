import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  rerender,
  getRootElement,
  click,
  find
} from '@ember/test-helpers';
import { text } from 'dummy/utils/samples';
import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';
import WrapUrls from '@zestia/ember-wrap-urls/components/wrap-urls';
import Link from '@zestia/ember-wrap-urls/components/wrap-urls/link';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

module('Integration | Component | wrap urls', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    await render(<template><WrapUrls /></template>);

    assert.strictEqual(
      getRootElement().innerHTML,
      '<!---->',
      'renders as a tagless component'
    );

    await render(<template><WrapUrls>foo</WrapUrls></template>);

    assert.strictEqual(getRootElement().innerHTML, '<!---->', 'no block mode');
  });

  test('escaping', async function (assert) {
    assert.expect(1);

    await render(<template><WrapUrls @text="<script>" /></template>);

    assert.strictEqual(
      getRootElement().innerHTML,
      '&lt;script&gt;',
      'text is escaped'
    );
  });

  test('null text', async function (assert) {
    assert.expect(1);

    await render(<template><WrapUrls @text={{null}} /></template>);

    assert.strictEqual(
      getRootElement().innerHTML,
      '<!---->',
      'does not blow up'
    );
  });

  test('it wraps urls', async function (assert) {
    assert.expect(1);

    await render(<template><WrapUrls @text={{text}} /></template>);

    assert.strictEqual(
      getRootElement().innerHTML,
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

    await render(<template>
      <WrapUrls @Url={{Link}} @text={{text}} />
    </template>);

    assert.strictEqual(
      getRootElement().innerHTML.trim(),
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

    await render(<template>
      {{! template-lint-disable no-triple-curlies }}
      <WrapUrls @text={{{"visit https://example.com"}}} />
    </template>);

    assert.strictEqual(
      getRootElement().innerHTML.trim(),
      'visit <span class="wrapped-url">https://example.com</span>'
    );
  });

  test('custom component', async function (assert) {
    assert.expect(1);

    // prettier-ignore
    const Foo = <template><a href={{@url.string}} target="foo">{{@url.string}}</a></template>;

    await render(<template>
      <WrapUrls @Url={{Foo}} @text="visit http://my http://link" />
    </template>);

    assert.strictEqual(
      getRootElement().innerHTML.trim(),
      'visit <a href="http://my" target="foo">http://my</a> <a href="http://link" target="foo">http://link</a>'
    );
  });

  test('custom pattern', async function (assert) {
    assert.expect(1);

    const pattern = /mailto:(.*)?/g;

    await render(<template>
      <WrapUrls @pattern={{pattern}} @text="email me mailto:fred@smith.com" />
    </template>);

    assert.strictEqual(
      getRootElement().innerHTML.trim(),
      'email me <span class="wrapped-url">mailto:fred@smith.com</span>'
    );
  });

  test('re-computing', async function (assert) {
    assert.expect(2);

    const state = new (class {
      @tracked text = 'http://foo.com';
    })();

    await render(<template><WrapUrls @text={{state.text}} /></template>);

    assert.strictEqual(
      getRootElement().innerHTML,
      '<span class="wrapped-url">http://foo.com</span>'
    );

    state.text = 'http://bar.com';

    await rerender();

    assert.strictEqual(
      getRootElement().innerHTML,
      '<span class="wrapped-url">http://bar.com</span>'
    );
  });

  test('start and end properties', async function (assert) {
    assert.expect(1);

    // prettier-ignore
    const MyLink = <template><div class="my-link">{{@url.start}} {{@url.string}} {{@url.end}}</div></template>;

    await render(<template>
      <WrapUrls
        @Url={{MyLink}}
        @text="One: http://one.com Two: http://two.com"
      />
    </template>);

    assert.strictEqual(
      getRootElement().innerHTML.trim(),
      'One: <div class="my-link">5 http://one.com 19</div> Two: <div class="my-link">25 http://two.com 39</div>'
    );
  });

  test('issue: https://github.com/emberjs/ember.js/issues/17458', async function (assert) {
    assert.expect(0);

    const state = new (class {
      @tracked text = 'http://emberjs.com';
    })();

    const viewMore = () => (state.text = 'Visit: http://emberjs.com');

    await render(<template>
      <WrapUrls @text={{text}} />

      <button type="button" {{on "click" viewMore}}>View more</button>
    </template>);

    // Mimic what Google Translate does
    const url = find('.wrapped-url');
    const wrapper = document.createElement('font');

    url.parentNode.insertBefore(wrapper, url);
    wrapper.appendChild(url);

    await click('button');
  });
});
