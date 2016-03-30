import Component from 'ember-component';
import layout from '../templates/components/wrap-urls';

const WrapUrlsComponent = Component.extend({
  layout: layout,
  tagName: '',
  parts: null,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('parts', this._textToParts(this.getAttr('text')));
    this.set('urlComponent', this.getAttr('component') || 'wrap-urls/url');
  },

  _textToParts(text = '') {
    let lastIndex = 0;
    let parts = [];
    let match;

    while ((match = WrapUrlsComponent.regex.exec(text))) {
      let [ url ] = match;
      let { index: start } = match;

      console.log(match);

      parts.push({ text: text.slice(lastIndex, start) });
      parts.push({ url });

      lastIndex = start + url.length;
    }

    parts.push({ text: text.slice(lastIndex) });

    return parts;
  }
});

WrapUrlsComponent.reopenClass({
  regex: /(https?|file|ftp):\/\/([a-zA-Z0-9~!@#$%\^&*()_\-=+\/?.:;',]*)?/g
});

export default WrapUrlsComponent;