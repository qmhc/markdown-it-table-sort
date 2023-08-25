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
