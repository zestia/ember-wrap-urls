import Component from '@ember/component';
import layout from '../../templates/components/wrap-urls/url';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['wrapped-url'],
  attributeBindings: ['id']
});
