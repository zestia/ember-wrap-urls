import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { text } from 'dummy/utils/samples';
import Component from 'ember-component';


moduleForComponent('wrap-urls', 'Integration | Component | wrap urls', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{wrap-urls}}`);

  assert.equal(this.$().html(), '<!---->',
    'renders as a tagless component');

  this.render(hbs`{{#wrap-urls}}foo{{/wrap-urls}}`);

  assert.equal(this.$().html(), '<!---->',
    'no block mode');
});


test('urls to hyperlinks', function(assert) {
  assert.expect(1);

  this.set('text', text);

  this.render(hbs`{{wrap-urls text=text}}`);

  let expecting = `
http: <a href="http://foo.com" class="ember-view hyperlink">http://foo.com</a>
https: <a href="https://bar.com" class="ember-view hyperlink">https://bar.com</a>
ftp: <a href="ftp://baz.com" class="ember-view hyperlink">ftp://baz.com</a>
file: <a href="file://qux.jpg" class="ember-view hyperlink">file://qux.jpg</a>
emoji: 💩 <a href="http://norf.com" class="ember-view hyperlink">http://norf.com</a>
subdomain: <a href="http://foo.bar.com" class="ember-view hyperlink">http://foo.bar.com</a>
path: <a href="http://foo.com/bar/baz" class="ember-view hyperlink">http://foo.com/bar/baz</a>
close: <a href="http://foo.com" class="ember-view hyperlink">http://foo.com</a> <a href="https://bar.com" class="ember-view hyperlink">https://bar.com</a>
`;

  assert.equal(this.$().html(), expecting,
    'replaces urls with hyperlinks by defaults');
});


test('custom component', function(assert) {
  assert.expect(1);

  const XFooComponent = Component.extend({
    layout: hbs`{{attrs.url}}`,
    attributeBindings: ['target']
  });

  this.register('component:x-foo', XFooComponent);

  this.render(hbs`
    {{~wrap-urls
      text='visit http://my http://link'
      component=(component 'x-foo' target="foo")~}}
  `);

  let expecting = 'visit <div id="ember278" target="foo" class="ember-view">http://my</div> <div id="ember281" target="foo" class="ember-view">http://link</div><!---->';

  assert.equal(this.$().html(), expecting,
    'can render each URL using a custom component');
});
