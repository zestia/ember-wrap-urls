import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | wrap urls/url', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    await render(hbs`{{wrap-urls/url url="http://example.com"}}`);

    assert.equal(findAll('.wrapped-url').length, 1,
      'renders a url with an appropriate class name');

    assert.equal(find('.wrapped-url').tagName, 'SPAN',
      'renders as an inline element');

    assert.equal(find('.wrapped-url').textContent, 'http://example.com',
      'renders the url');
  });
});
