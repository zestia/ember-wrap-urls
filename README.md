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

Which will render:

```html
Check out my link <a href="http://example.com">http://example.com</a>
```

### Built in components

This addon comes with two extra components:

* `wrap-urls/url`
* `wrap-urls/hyperlink`

By default, URLs will be rendered using `wrap-urls/hyperlink`

To send in extra attributes you can do:

```handlebars
{{wrap-urls
  text=text
  component=(component 'wrap-urls/hyperlink' target="_blank")}}
```

Optionally if you just want to wrap the URLs:

```handlebars
{{wrap-urls text='Visit http://example.com' component='wrap-urls/url'}}
```

Will result in:

```html
Visit <span class="url">http://example.com</span>
```

Which can be useful for styling...

```css
.url { word-break: break-all; }
```


### Customising

Specify your own component to customise how URLs are rendered:

```handlebars
{{wrap-urls text=text component=(component 'my-tooltip')}}
```

