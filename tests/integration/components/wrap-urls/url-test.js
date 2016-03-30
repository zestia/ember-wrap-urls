import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wrap-urls/url', 'Integration | Component | wrap urls/url', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.render(hbs`{{wrap-urls/url url='http://example.com'}}`);

  assert.equal(this.$('.url').length, 1,
    'renders a url with an appropriate class name');

  assert.equal(this.$('.url').prop('tagName'), 'SPAN',
    'renders as an inline element');

  assert.equal(this.$('.url').text(), 'http://example.com',
    'renders the url');
});
