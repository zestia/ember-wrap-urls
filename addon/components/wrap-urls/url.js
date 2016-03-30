import Component from 'ember-component';
import layout from '../../templates/components/wrap-urls/url';

export default Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['url']
});
