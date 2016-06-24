import Component from 'ember-component';
import layout from '../../templates/components/wrap-urls/hyperlink';

export default Component.extend({
  layout: layout,
  tagName: 'a',

  classNames: ['wrapped-url-link'],

  attributeBindings: [
    'url:href',

    'name',
    'target',
    'rel',
    'id'
  ]
});
