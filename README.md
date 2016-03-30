# ember-wrap-urls

<a href="http://emberobserver.com/addons/ember-wrap-urls"><img src="http://emberobserver.com/badges/ember-wrap-urls.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-wrap-urls#badge-embed"><img src="https://david-dm.org/amk221/ember-wrap-urls.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-wrap-urls#dev-badge-embed"><img src="https://david-dm.org/amk221/ember-wrap-urls/dev-status.svg"></a> &nbsp; <a href="https://codeclimate.com/github/amk221/ember-wrap-urls"><img src="https://codeclimate.com/github/amk221/ember-wrap-urls/badges/gpa.svg" /></a> &nbsp; <a href="http://travis-ci.org/amk221/ember-wrap-urls"><img src="https://travis-ci.org/amk221/ember-wrap-urls.svg?branch=master"></a>

This Ember addon takes some text, which may or may not contain URLs and renders the text and each URL as an Ember component.

### Installation
```
ember install ember-wrap-urls
```

### Example usage

Given the following:

```handlebars
{{wrap-urls text='Check out my link: http://example.com'}}
```

Will render:

```html
Check out my link <span class="url">http://example.com</span>
```

### Built in components

This addon comes with two extra components:

* `wrap-urls/url`
* `wrap-urls/hyperlink`

By default, URLs will be rendered using `wrap-urls/url`

You can set `component` to change which component is used to render each URL:

```handlebars
{{wrap-urls text='Visit http://example.com' component='wrap-urls/hyperlink'}}
```

Will result in:

```html
Visit <a class="hyperlink" href="http://example.com">http://example.com</a>
```

To send in your own attributes:

```handlebars
{{wrap-urls
  text='Visit http://example.com'
  component=(component 'wrap-urls/hyperlink' target="_blank")}}
```

### Customising

Specify your own component to customise how URLs are rendered:

```handlebars
{{wrap-urls text=text component=(component 'my-tooltip')}}
```

You change the pattern used to find hyperlinks:

```javascript
import WrapUrlsComponent from 'ember-wrap-urls/components/wrap-urls';

WrapUrlsComponent.reopenClass({
  regex: /yourRegexGoesHere/g
});
```