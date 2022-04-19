# @zestia/ember-wrap-urls

[![Latest npm release][npm-badge]][npm-badge-url]
[![GitHub Actions][github-actions-badge]][github-actions-url]
[![Ember Observer][ember-observer-badge]][ember-observer-url]

[npm-badge]: https://img.shields.io/npm/v/@zestia/ember-wrap-urls.svg
[npm-badge-url]: https://www.npmjs.com/package/@zestia/ember-wrap-urls
[github-actions-badge]: https://github.com/zestia/ember-wrap-urls/workflows/CI/badge.svg
[github-actions-url]: https://github.com/zestia/ember-wrap-urls/actions
[ember-observer-badge]: https://emberobserver.com/badges/-zestia-ember-wrap-urls.svg
[ember-observer-url]: https://emberobserver.com/addons/@zestia/ember-wrap-urls

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
