import type { ChatService } from '@/services/ChatService'
import { createStore } from '@stencil/store'

// TODO: Seems like there is no message type being exported from orama-client rn
// export type TChatMessageBlock = {
//   type: 'text' | 'component' | 'sources'
//   received?: boolean
//   content: string
// }

export type TChatMessage = {
  role: 'user' | 'assistant'
  content: string
  // messageBlocks: TChatMessageBlock[]
}

const { state: chatContext } = createStore({
  messages: [] as TChatMessage[],
  isLoading: false,
  // TODO: Evaluate if we need to have a error object/string instead of just a boolean
  error: false,
  chatService: null as ChatService | null,
})

export { chatContext }
