<h1 align="center">markdown-it-table-sort</h1>

<p align="center">
  一款 <a href="https://github.com/markdown-it/markdown-it">Markdown It</a> 插件，用于根据内容对表格进行排序。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/markdown-it-table-sort">
    <img src="https://img.shields.io/npm/v/markdown-it-table-sort?color=orange&label=" alt="version" />
  </a>
  <a href="https://github.com/qmhc/markdown-it-table-sort/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/markdown-it-table-sort" alt="license" />
  </a>
</p>

**中文** | [English](./README.md)

## 安装

```sh
pnpm i vite-plugin-dts -D
```

## 使用

```ts
import md from 'markdown-it'
import tableSort from 'markdown-it-table-sort'

md().use(tableSort)

// 添加选项
md().use(tableSort, { reverse: true })
```

## 选项

```ts
export interface PluginOptions {
  /**
   * 是否颠倒排序的结果
   *
   * @default false
   */
  reverse?: boolean,
  /**
   * 指定一个根据内容排序行的方法
   */
  sortRows?: (prev: string[], next: string[]) => number
}
```

## 贡献者

感谢他们的所做的一切贡献！

<a href="https://github.com/qmhc/markdown-it-table-sort/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=qmhc/markdown-it-table-sort" />
</a>

## 授权

MIT 授权。
