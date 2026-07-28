import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

var link = setComponentTemplate(precompileTemplate("<a href={{@url.string}} class=\"wrapped-url-link\" ...attributes>\n  {{~@url.string~}}\n</a>", {
  strictMode: true
}), templateOnly());

export { link as default };
//# sourceMappingURL=link.js.map
