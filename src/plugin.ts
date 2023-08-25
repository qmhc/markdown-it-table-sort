import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'
import type { PluginOptions } from './types'

function defaultSort(prev: string[], next: string[]) {
  const length = Math.min(prev.length, next.length)

  for (let i = 0; i < length; ++i) {
    const result = prev[i].localeCompare(next[i])

    if (result) {
      return result
    }
  }

  return prev.length - next.length
}

export function tableSort(md: MarkdownIt, options: PluginOptions = {}) {
  const { reverse = false, sortRows = defaultSort } = options
  const tbodyOpen = md.renderer.rules.tbody_open

  md.renderer.rules.tbody_open = (tokens, idx, options, env, self) => {
    const createRow = () => ({ chunk: -1, content: [] as string[] })

    type Row = ReturnType<typeof createRow>

    const rows: Row[] = []
    const chunks: Token[][] = []

    let row!: Row
    let chunk: Token[] = []
    let inTd = false
    let content = ''

    for (let i = idx + 1, len = tokens.length; i < len; ++i) {
      const token = tokens[i]
      const type = token.type

      if (type === 'tbody_close') {
        break
      }

      if (type === 'tr_open') {
        row = createRow()

        if (chunk.length) {
          row.chunk = chunks.push(chunk)
        } else {
          row.chunk = chunks.length
        }

        chunk = [token]
        continue
      }

      chunk.push(token)

      if (type === 'tr_close') {
        Object.freeze(row.content)
        rows.push(row)
        chunks.push(chunk)
        chunk = []
      } else if (type === 'td_open') {
        inTd = true
      } else if (inTd && type === 'inline') {
        content += (token.content || '')
      } else if (type === 'td_close') {
        row.content.push(content)
        inTd = false
        content = ''
      }
    }

    if (rows.length > 1) {
      const rowChunk = rows.map(row => row.chunk)

      rows.sort((prev, next) => sortRows(prev.content, next.content))
      reverse && rows.reverse()

      const sortedRowChunk = rows.map(row => row.chunk)
      const newChunks: Token[][] = []

      for (let i = 0, len = chunks.length; i < len; ++i) {
        const chunk = chunks[i]
        const chunkIdx = rowChunk.findIndex(c => c === i)

        if (~chunkIdx) {
          newChunks.push(chunks[sortedRowChunk[chunkIdx]])
        } else {
          newChunks.push(chunk)
        }
      }

      const newTokens = newChunks.flat()

      tokens.splice(idx + 1, newTokens.length, ...newTokens)
    }

    return tbodyOpen
      ? tbodyOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
  }
}
