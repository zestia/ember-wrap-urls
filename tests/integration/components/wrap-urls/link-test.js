import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'wrap-urls/link',
  'Integration | Component | wrap urls/link', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{wrap-urls/link url='http://example.com'}}`);

  assert.equal(this.$('.wrapped-url-link').length, 1,
    'renders a url with an appropriate class name');

  assert.equal(this.$('.wrapped-url-link').prop('tagName'), 'A',
    'renders as an inline element');

  assert.equal(this.$('.wrapped-url-link').text(), 'http://example.com',
    'renders the url');

  assert.equal(this.$('.wrapped-url-link').attr('href'), 'http://example.com',
    'renders the url as a wrapped link');
});


test('name', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/link name='foo'}}`);

  assert.equal(this.$('.wrapped-url-link').attr('name'), 'foo',
    'can specify a name attribute');
});


test('target', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/link target='_blank'}}`);

  assert.equal(this.$('.wrapped-url-link').attr('target'), '_blank',
    'can specify a target attribute');
});


test('rel', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/link rel='nofollow'}}`);

  assert.equal(this.$('.wrapped-url-link').attr('rel'), 'nofollow',
    'can specify a rel attribute');
});


test('id', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/link id='foo'}}`);

  assert.equal(this.$('.wrapped-url-link').attr('id'), 'foo',
    'can specify a id attribute');
});
