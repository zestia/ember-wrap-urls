# @zestia/ember-wrap-urls

<p>
  <a href="http://travis-ci.org/zestia/ember-wrap-urls">
    <img src="https://travis-ci.org/zestia/ember-wrap-urls.svg?branch=master">
  </a>

  <a href="https://david-dm.org/zestia/ember-wrap-urls#badge-embed">
    <img src="https://david-dm.org/zestia/ember-wrap-urls.svg">
  </a>

  <a href="https://david-dm.org/zestia/ember-wrap-urls#dev-badge-embed">
    <img src="https://david-dm.org/zestia/ember-wrap-urls/dev-status.svg">
  </a>

  <a href="https://emberobserver.com/addons/@zestia/ember-wrap-urls">
    <img src="https://emberobserver.com/badges/-zestia-ember-wrap-urls.svg">
  </a>

  <img src="https://img.shields.io/badge/Ember-%3E%3D%203.16-brightgreen">
</p>

This Ember addon takes some text, which may or may not contain URLs and renders the text and each URL as an Ember component.

## Installation

```
ember install @zestia/ember-wrap-urls
```

## Demo

https://zestia.github.io/ember-wrap-urls/

## Example

Given the following:

```hbs
<WrapUrls @text="Check out my link: http://example.com" />
```

Will render:

```hbs
Check out my link <span class="wrapped-url">http://example.com</span>
```

## Built in components

This addon comes with two built in components:

- `wrap-urls/url`
- `wrap-urls/link`

By default, URLs will be rendered using `wrap-urls/url`

You can set `@Url` to change which component is used to render each URL:

```hbs
<WrapUrls
  @Url={{component "wrap-urls/link"}}
  @text="Visit http://example.com"
/>
```

Will result in:

```hbs
Visit <a class="wrapped-url-link" href="http://example.com">http://example.com</a>
```

## Customising

Specify your own `@pattern` to use for finding hyperlinks, and your own `@Url` to customise how they are rendered.

```hbs
<WrapUrls
  @Url={{component "mailto"}}
  @text={{this.text}}
  @pattern={{this.mailtoPattern}}
/>
```

In your component's template you will have access to:

```hbs
{{@url.string}}
{{@url.start}}
{{@url.end}}
```
