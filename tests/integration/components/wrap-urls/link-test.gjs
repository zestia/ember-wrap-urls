import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Link from '@zestia/ember-wrap-urls/components/wrap-urls/link';

module('wrap-urls/link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);

    const url = {
      string: 'http://example.com'
    };

    await render(<template><Link @url={{url}} /></template>);

    assert
      .dom('.wrapped-url-link')
      .exists({ count: 1 }, 'renders a url with an appropriate class name');

    assert
      .dom('.wrapped-url-link')
      .hasTagName('a', 'renders as an inline element');

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
