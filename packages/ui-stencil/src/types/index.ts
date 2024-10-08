export type SearchResult = {
  id: string
  title: string
  description: string
  path: string
}

export type ColorScheme = 'dark' | 'light' | 'system'

export type SearchResultWithScore = SearchResult & { score: number }

export type SearchResultBySection = {
  section: string | undefined
  items: SearchResultWithScore[]
}

export type ResultMap = { [K in keyof Omit<SearchResult, 'id'> | 'section']?: string }

export type SourcesMap = { [K in keyof Omit<SearchResult, 'id'>]?: string }

export type CloudIndexConfig = {
  api_key: string
  endpoint: string
}
