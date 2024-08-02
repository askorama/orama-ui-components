import { createStore } from '@stencil/store'

const { state: globalContext } = createStore({
  open: false,
  currentTask: 'search' as 'search' | 'chat',
  currentTerm: '',
})

export { globalContext }
