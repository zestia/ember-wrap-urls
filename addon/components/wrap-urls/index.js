import Component from '@glimmer/component';

export default class WrapUrlsComponent extends Component {
  get parts() {
    return this._textToParts(this.args.text);
  }

  get urlComponent() {
    return this.args.component || 'wrap-urls/url';
  }

  get defaultPattern() {
    return /(https?|file|ftp):\/\/([a-zA-Z0-9~!@#$%^&*()_\-=+/?.:;',]*)?/g;
  }

  get pattern() {
    return this.args.pattern || this.defaultPattern;
  }

  _textToParts(text) {
    text = text || '';
    text = text.toString();

    const parts = [];
    const regex = this.pattern;

    let lastIndex = 0;
    let match;
    let string;

    while ((match = regex.exec(text))) {
      const [url] = match;
      const { index: start } = match;

      string = text.slice(lastIndex, start);

      lastIndex = start + url.length;

      if (string) {
        parts.push({
          text: string,
        });
      }

      parts.push({
        url,
        start,
        end: lastIndex,
      });
    }

    string = text.slice(lastIndex);

    if (string) {
      parts.push({
        text: string,
      });
    }

    return parts;
  }
}
