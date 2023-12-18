import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import Url from '@zestia/ember-wrap-urls/components/wrap-urls/url';

module('wrap-urls/url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    const url = {
      string: 'http://example.com'
    };

    await render(<template><Url @url={{url}} /></template>);

    assert
      .dom('.wrapped-url')
      .exists({ count: 1 }, 'renders a url with an appropriate class name');

    assert
      .dom('.wrapped-url')
      .hasTagName('span', 'renders as an inline element');

    assert.dom('.wrapped-url').hasText('http://example.com', 'renders the url');
  });
});
