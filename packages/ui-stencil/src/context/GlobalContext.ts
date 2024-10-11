import { createStore } from '@stencil/store'

const { state: globalContext, ...globalStore } = createStore({
  open: false,
  currentTask: 'search' as 'search' | 'chat',
  currentTerm: '',
})

export { globalContext, globalStore }
