import Component from '@glimmer/component';
import Url from './wrap-urls/url.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const URL_PATTERN = /(https?|file|ftp):\/\/([a-zA-Z0-9~!@#$%^&*()_\-=+/?.:;',]*)?/g;
class WrapUrlsComponent extends Component {
  get parts() {
    return this._textToParts(this.args.text);
  }
  get Url() {
    return this.args.Url ?? Url;
  }
  get pattern() {
    return this.args.pattern ?? URL_PATTERN;
  }
  _textToParts(text) {
    text = text || '';
    text = text.toString();
    const parts = [];
    const regex = this.pattern;
    let lastIndex = 0;
    let match;
    let string;
    while (match = regex.exec(text)) {
      const [url] = match;
      const {
        index: start
      } = match;
      string = text.slice(lastIndex, start);
      lastIndex = start + url.length;
      if (string) {
        parts.push(string);
      }
      parts.push({
        string: url,
        start,
        end: lastIndex
      });
    }
    string = text.slice(lastIndex);
    if (string) {
      parts.push(string);
    }
    return parts;
  }
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-unnecessary-curly-strings --}}\n{{#let this.Url as |Url|}}\n  {{#each this.parts as |part|}}\n    {{#if part.string}}\n      {{~\"\"~}}<Url @url={{part}} />{{~\"\"~}}\n    {{else}}\n      {{~\"\"~}}{{part}}{{~\"\"~}}\n    {{/if}}\n  {{/each}}\n{{/let}}", {
      strictMode: true
    }), this);
  }
}

export { URL_PATTERN, WrapUrlsComponent as default };
//# sourceMappingURL=wrap-urls.js.map
