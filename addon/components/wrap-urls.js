import Component from '@ember/component';
import layout from '../templates/components/wrap-urls';
import { computed } from '@ember/object';

const pattern = /(https?|file|ftp):\/\/([a-zA-Z0-9~!@#$%^&*()_\-=+/?.:;',]*)?/g;

export default class WrapUrlsComponent extends Component {
  layout = layout;
  tagName = '';

  @computed('text')
  get parts() {
    return this._textToParts(this.text);
  }

  @computed('component')
  get urlComponent() {
    return this.component || 'wrap-urls/url';
  }

  @computed('pattern')
  get regex() {
    return this.pattern || pattern;
  }

  _textToParts(text) {
    text = text || '';
    text = text.toString();

    const parts = [];
    let lastIndex = 0;
    let match;
    let string;

    while ((match = this.regex.exec(text))) {
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
}
