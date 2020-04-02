import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('wrap-urls/url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    await render(hbs`<WrapUrls::Url @url="http://example.com" />`);

    assert
      .dom('.wrapped-url')
      .exists({ count: 1 }, 'renders a url with an appropriate class name');

    assert.equal(
      find('.wrapped-url').tagName,
      'SPAN',
      'renders as an inline element'
    );

    assert.dom('.wrapped-url').hasText('http://example.com', 'renders the url');
  });
});
