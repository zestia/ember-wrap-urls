import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('wrap-urls/link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);

    this.url = {
      string: 'http://example.com'
    };

    await render(hbs`<WrapUrls::Link @url={{this.url}} />`);

    assert
      .dom('.wrapped-url-link')
      .exists({ count: 1 }, 'renders a url with an appropriate class name');

    assert.equal(
      find('.wrapped-url-link').tagName,
      'A',
      'renders as an inline element'
    );

    assert
      .dom('.wrapped-url-link')
      .hasText('http://example.com', 'renders the url');

    assert
      .dom('.wrapped-url-link')
      .hasAttribute(
        'href',
        'http://example.com',
        'renders the url as a wrapped link'
      );
  });
});
