# @zestia/ember-wrap-urls

<a href="https://badge.fury.io/js/%40zestia%2Fember-wrap-urls"><img src="https://badge.fury.io/js/%40zestia%2Fember-wrap-urls.svg" alt="npm version" height="18"></a> &nbsp;
<a href="http://travis-ci.org/zestia/ember-wrap-urls"><img src="https://travis-ci.org/zestia/ember-wrap-urls.svg?branch=master"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-wrap-urls#badge-embed"><img src="https://david-dm.org/zestia/ember-wrap-urls.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-wrap-urls#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-wrap-urls/dev-status.svg"></a> &nbsp; <a href="https://emberobserver.com/addons/@zestia/ember-wrap-urls"><img src="https://emberobserver.com/badges/-zestia-ember-wrap-urls.svg"></a>

This Ember addon takes some text, which may or may not contain URLs and renders the text and each URL as an Ember component.

## Installation

```
ember install @zestia/ember-wrap-urls
```

## Example

Given the following:

```handlebars
<WrapUrls @text="Check out my link: http://example.com" />
```

Will render:

```html
Check out my link <span class="wrapped-url">http://example.com</span>
```

## Built in components

This addon comes with two extra components:

- `wrap-urls/url`
- `wrap-urls/link`

By default, URLs will be rendered using `wrap-urls/url`

You can set `component` to change which component is used to render each URL:

```handlebars
<WrapUrls @text="Visit http://example.com" @component="wrap-urls/link" />
```

Will result in:

```html
Visit
<a class="wrapped-url-link" href="http://example.com">http://example.com</a>
```

To send in your own arguments:

```handlebars
<WrapUrls
  @text="Visit http://example.com"
  @component={{component "wrap-urls/link" target="_blank"}} />
```

## Customising

Specify your own component to customise how URLs are rendered:

```handlebars
<WrapUrls @text={{text}} @component={{component "my-link"}} />
```

Then, in your component's template you will have access to `@url`, `@start`, and `@end`.

You can also change the pattern used to find hyperlinks:

```javascript
import WrapUrlsComponent from '@zestia/ember-wrap-urls/components/wrap-urls';

WrapUrlsComponent.reopenClass({
  regex: /yourRegexGoesHere/g
});
```
