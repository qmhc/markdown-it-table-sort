import { describe, expect, it, vi } from 'vitest'

import md from 'markdown-it'
import tableSort from '../src'

import type { PluginOptions } from '../src'

function normalizeLines(content: string) {
  return content
    .replace(/\s*\r*\n\r*\s*/g, '\n')
    .replace(/^\n/, '')
}

describe('table sort', () => {
  it('default sort', () => {
    expect(
      md().use(tableSort).render(normalizeLines(`
        | h1 |
        | --- |
        | b |
        | a |
        | c |
      `))
    ).toEqual(
      normalizeLines(/* html */ `
        <table>
          <thead>
            <tr>
              <th>h1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
            </tr>
            <tr>
              <td>b</td>
            </tr>
            <tr>
              <td>c</td>
            </tr>
          </tbody>
        </table>
      `)
    )
  })

  it('sort if partial content is same', () => {
    expect(
      md().use(tableSort).render(normalizeLines(`
        | h1 | h2 |
        | --- | --- |
        | b | 1 |
        | a | 3 |
        | a | 2 |
      `))
    ).toEqual(
      normalizeLines(/* html */ `
        <table>
          <thead>
            <tr>
              <th>h1</th>
              <th>h2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>2</td>
            </tr>
            <tr>
              <td>a</td>
              <td>3</td>
            </tr>
            <tr>
              <td>b</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      `)
    )
  })

  it('custom sort method', () => {
    const sortRows: PluginOptions['sortRows'] = (prev, next) => {
      return next[0].localeCompare(prev[0])
    }

    expect(
      md().use(tableSort, { sortRows }).render(normalizeLines(`
        | h1 |
        | --- |
        | b |
        | a |
        | c |
      `))
    ).toEqual(
      normalizeLines(/* html */ `
        <table>
          <thead>
            <tr>
              <th>h1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>c</td>
            </tr>
            <tr>
              <td>b</td>
            </tr>
            <tr>
              <td>a</td>
            </tr>
          </tbody>
        </table>
      `)
    )
  })

  it('reverse', () => {
    expect(
      md().use(tableSort, { reverse: true }).render(normalizeLines(`
        | h1 |
        | --- |
        | b |
        | a |
        | c |
      `))
    ).toEqual(
      normalizeLines(/* html */ `
        <table>
          <thead>
            <tr>
              <th>h1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>c</td>
            </tr>
            <tr>
              <td>b</td>
            </tr>
            <tr>
              <td>a</td>
            </tr>
          </tbody>
        </table>
      `)
    )
  })

  it('do not sort when rows count less than 2', () => {
    const sortRows = vi.fn(() => 0)

    md().use(tableSort, { sortRows }).render(normalizeLines(`
      | h1 |
      | --- |
      | a |
    `))

    expect(sortRows).not.toHaveBeenCalled()

    md().use(tableSort, { sortRows }).render(normalizeLines(`
      | h1 |
      | --- |
      | a |
      | b |
    `))

    expect(sortRows).toHaveBeenCalled()
  })
})
