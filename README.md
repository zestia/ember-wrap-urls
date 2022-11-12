# @zestia/ember-wrap-urls

[![Latest npm release][npm-badge]][npm-badge-url]
[![Ember Observer][ember-observer-badge]][ember-observer-url]

<!-- [![GitHub Actions][github-actions-badge]][github-actions-url] -->

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

https://zestia.github.io/ember-wrap-urls

## Example

Given the following:

```hbs
<WrapUrls @text='Check out my link: http://example.com' />
```

Will render:

```hbs
Check out my link <span class='wrapped-url'>http://example.com</span>
```

## `WrapUrls`

### Arguments

#### `@text`

Required. The text within which to find URLs.

#### `@Url`

Optional. The component used to display each URL discovered within `@text`. Defaults to `wrap-urls/url`. You can also set it to `wrap-urls/link`, or a component of your choice.

#### `@pattern`

Optional. The regular expression used to find URLs in the `@text`. You may wish to set this to match mailto links for example.

### API

When a URL is found, and a component is rendered in its place, that component will have this API available to it in the template as an argument `@url`.

#### `string`

The URL that this component should render.

#### `start`

The position in the `@text` where the URL starts.

#### `end`

The position in the `@text` where the URL ends.
