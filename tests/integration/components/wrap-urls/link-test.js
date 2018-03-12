import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('wrap-urls/link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);

    await render(hbs`{{wrap-urls/link url="http://example.com"}}`);

    assert.equal(findAll('.wrapped-url-link').length, 1,
      'renders a url with an appropriate class name');

    assert.equal(find('.wrapped-url-link').tagName, 'A',
      'renders as an inline element');

    assert.equal(find('.wrapped-url-link').textContent, 'http://example.com',
      'renders the url');

    assert.equal(find('.wrapped-url-link').getAttribute('href'), 'http://example.com',
      'renders the url as a wrapped link');
  });

  test('name', async function(assert) {
    assert.expect(1);

    await render(hbs`{{wrap-urls/link name="foo"}}`);

    assert.equal(find('.wrapped-url-link').getAttribute('name'), 'foo',
      'can specify a name attribute');
  });

  test('target', async function(assert) {
    assert.expect(1);

    await render(hbs`{{wrap-urls/link target="_blank"}}`);

    assert.equal(find('.wrapped-url-link').getAttribute('target'), '_blank',
      'can specify a target attribute');
  });

  test('rel', async function(assert) {
    assert.expect(1);

    await render(hbs`{{wrap-urls/link rel="nofollow"}}`);

    assert.equal(find('.wrapped-url-link').getAttribute('rel'), 'nofollow',
      'can specify a rel attribute');
  });

  test('id', async function(assert) {
    assert.expect(1);

    await render(hbs`{{wrap-urls/link id="foo"}}`);

    assert.equal(find('.wrapped-url-link').getAttribute('id'), 'foo',
      'can specify a id attribute');
  });
});
