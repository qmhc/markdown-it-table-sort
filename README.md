<h1 align="center">markdown-it-table-sort</h1>

<p align="center">
  A plugin for <a href="https://github.com/markdown-it/markdown-it">Markdown It</a> to sort table by content.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/markdown-it-table-sort">
    <img src="https://img.shields.io/npm/v/markdown-it-table-sort?color=orange&label=" alt="version" />
  </a>
  <a href="https://github.com/qmhc/markdown-it-table-sort/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/markdown-it-table-sort" alt="license" />
  </a>
</p>

**English** | [中文](./README.zh-CN.md)

## Install

```sh
pnpm i markdown-it-table-sort -D
```

## Usage

```ts
import md from 'markdown-it'
import tableSort from 'markdown-it-table-sort'

md().use(tableSort)

// With options
md().use(tableSort, { reverse: true })
```

## Options

```ts
export interface PluginOptions {
  /**
   * Whether to reverse the sorted result
   *
   * @default false
   */
  reverse?: boolean,
  /**
   * Specify a method to sort rows by content
   */
  sortRows?: (prev: string[], next: string[]) => number
}
```

## Contributors

Thanks for all the contributions!

<a href="https://github.com/qmhc/markdown-it-table-sort/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=qmhc/markdown-it-table-sort" />
</a>

## License

MIT License.
