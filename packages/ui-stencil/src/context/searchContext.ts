import { createStore } from '@stencil/store'

const { state: searchContext } = createStore({
  open: false,
  count: 0,
  facets: null as Record<
    string,
    {
      count: number
      values: Record<string, number>
    }
  > | null,
  hits: [],
  term: '',
  highlightedIndex: -1
})

export { searchContext }
