import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

var Url = setComponentTemplate(precompileTemplate("<span class=\"wrapped-url\" ...attributes>\n  {{~@url.string~}}\n</span>", {
  strictMode: true
}), templateOnly());

export { Url as default };
//# sourceMappingURL=url.js.map
