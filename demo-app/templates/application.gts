import Route from 'ember-route-template';
import WrapUrls from '#src/components/wrap-urls';
import Link from '#src/components/wrap-urls/link';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';

// Forwards the discovered URL to the link component while adding the
// attributes needed to open links in a new tab. Passing them here (rather than
// currying via `{{component}}`) ensures they reach the anchor's `...attributes`.
const NewTabLink = <template>
  <Link @url={{@url}} target="_blank" rel="noopener noreferrer" />
</template>;

const sampleText =
  'http: http://foo.com\n' +
  'https: https://bar.com\n' +
  'ftp: ftp://baz.com\n' +
  'file: file://qux.jpg\n' +
  'emoji: 🔗http://norf.com\n' +
  'subdomain: http://foo.bar.com\n' +
  'path: http://foo.com/bar/baz\n' +
  'query: http://foo.com?bar=baz\n' +
  'close together: http://foo.com https://bar.com';

class ApplicationRoute extends Component {
  @tracked text = sampleText;

  setText = ({ target }) => (this.text = target.value);

  <template>
    <h1>
      @zestia/ember-wrap-urls
    </h1>

    <h4>
      Demo
    </h4>

    <textarea
      rows="12"
      cols="80"
      aria-label="Example text"
      {{on "input" this.setText}}
    >{{~this.text~}}</textarea>

    <br />
    <br />

    <div class="ugc">
      {{! template-lint-disable no-unnecessary-curly-strings }}
      {{~""~}}
      <WrapUrls @Url={{NewTabLink}} @text={{this.text}} />
    </div>

    {{outlet}}

    {{! template-lint-disable no-inline-styles }}
    <a href="https://github.com/zestia/ember-wrap-urls">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
  </template>
}

export default Route(ApplicationRoute);
