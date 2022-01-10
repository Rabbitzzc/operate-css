## operate-css

Insert CSS into head, or insert CSS attributes into any element. [npm -> operate-css](https://www.npmjs.com/package/operate-css)。

## usage

### install

```sh
yarn add dom
npm install dom 

import dom from 'dom'
```

### `css()`

```ts
// css({ el, styles }: { el: { style: { [x: string]: any } }; styles: { [x: string]: any } })
const el = document.getElementById('#dom')
const styles = {
    color: 'red',
    backgroundColor: 'lightblue'
}
dom.css(el, styles)
```

### `getStyleValue()`

```ts
// getStyleValue({ el, attr }: { el: HTMLElement; attr: string; })
const el = document.getElementById('#dom')
dom.getStyleValue(el, 'backgroundColor')
```

### `insertCSS()`

```ts
// insertCSS(css: string, options: { target?: any; prepend?: boolean })
// insert a string of css into the <head>
const css = 'body { background:blue; }'
const options = {
    target: 'head', // element
    prepend: true // true ?  'prepend' : 'append'
}
dom.insertCSS(css, options)
```
