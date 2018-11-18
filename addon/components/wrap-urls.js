/* eslint-disable no-cond-assign */

import Component from '@ember/component';
import layout from '../templates/components/wrap-urls';

const WrapUrlsComponent = Component.extend({
  layout,
  tagName: '',
  parts: null,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('parts', this._textToParts(this.text));
    this.set('urlComponent', this.component || 'wrap-urls/url');
  },

  _textToParts(text) {
    text = text || '';
    text = text.toString();

    const parts = [];
    let lastIndex = 0;
    let match;
    let string;

    while ((match = WrapUrlsComponent.regex.exec(text))) {
      const [url] = match;
      const { index: start } = match;

      string = text.slice(lastIndex, start);

      lastIndex = start + url.length;

      if (string) {
        parts.push({
          text: string
        });
      }

      parts.push({
        url,
        start,
        end: lastIndex
      });
    }

    string = text.slice(lastIndex);

    if (string) {
      parts.push({
        text: string
      });
    }

    return parts;
  }
});

WrapUrlsComponent.reopenClass({
  regex: /(https?|file|ftp):\/\/([a-zA-Z0-9~!@#$%^&*()_\-=+/?.:;',]*)?/g
});

export default WrapUrlsComponent;
