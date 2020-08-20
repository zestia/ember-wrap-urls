import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('wrap-urls/url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    this.url = {
      string: 'http://example.com'
    };

    await render(hbs`<WrapUrls::Url @url={{this.url}} />`);

    assert
      .dom('.wrapped-url')
      .exists({ count: 1 }, 'renders a url with an appropriate class name');

    assert
      .dom('.wrapped-url')
      .hasTagName('span', 'renders as an inline element');

    assert.dom('.wrapped-url').hasText('http://example.com', 'renders the url');
  });
});
