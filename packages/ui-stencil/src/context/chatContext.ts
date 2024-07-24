import type { ChatService } from '@/services/ChatService'
import { createStore } from '@stencil/store'

// TODO: Seems like there is no message type being exported from orama-client rn
// export type TChatMessageBlock = {
//   type: 'text' | 'component' | 'sources'
//   received?: boolean
//   content: string
// }

// TODO: this should be imported from orama-client
export type TChatMessage = {
  role: 'user' | 'assistant'
  content: string
  // messageBlocks: TChatMessageBlock[]
}

// TODO;: this type should be imported from orama-client
export type TAnswerStatus = 'idle' | 'loading' | 'streaming' | 'error' | 'done'

export type TChatInteraction = {
  query: string
  response?: string
  sources?: any[] // fix type
  status: TAnswerStatus
}

const { state: chatContext } = createStore({
  // TODO: Evaluate if we need to have a error object/string instead of just a boolean
  chatService: null as ChatService | null,
  interactions: [] as TChatInteraction[],
  error: false,
})

export { chatContext }
