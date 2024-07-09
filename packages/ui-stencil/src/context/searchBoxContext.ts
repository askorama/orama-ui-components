import { createStore } from '@stencil/store'

const { state: globalContext } = createStore({
  open: false,
  selectedTab: 'search' as 'search' | 'chat'
})

export { globalContext }
