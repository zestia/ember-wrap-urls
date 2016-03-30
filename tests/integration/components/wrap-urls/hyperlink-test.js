import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wrap-urls/hyperlink', 'Integration | Component | wrap urls/hyperlink', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{wrap-urls/hyperlink url='http://example.com'}}`);

  assert.equal(this.$('.hyperlink').length, 1,
    'renders a url with an appropriate class name');

  assert.equal(this.$('.hyperlink').prop('tagName'), 'A',
    'renders as an inline element');

  assert.equal(this.$('.hyperlink').text(), 'http://example.com',
    'renders the url');

  assert.equal(this.$('.hyperlink').attr('href'), 'http://example.com',
    'renders the url as a hyperlink');
});


test('name', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/hyperlink name='foo'}}`);

  assert.equal(this.$('.hyperlink').attr('name'), 'foo',
    'can specify a name attribute');
});


test('target', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/hyperlink target='_blank'}}`);

  assert.equal(this.$('.hyperlink').attr('target'), '_blank',
    'can specify a target attribute');
});


test('rel', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/hyperlink rel='nofollow'}}`);

  assert.equal(this.$('.hyperlink').attr('rel'), 'nofollow',
    'can specify a rel attribute');
});


test('id', function(assert) {
  assert.expect(1);

  this.render(hbs`{{wrap-urls/hyperlink id='foo'}}`);

  assert.equal(this.$('.hyperlink').attr('id'), 'foo',
    'can specify a id attribute');
});
