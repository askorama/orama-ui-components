import type { ChatService } from '@/services/ChatService'
import { createStore } from '@stencil/store'
import type { SourcesMap } from '@/types'

// TODO: Seems like there is no message type being exported from orama-client rn
// export type TChatMessageBlock = {
//   type: 'text' | 'component' | 'sources'
//   received?: boolean
//   content: string
// }

// TODO;: this type should be imported from orama-client
export enum TAnswerStatus {
  idle = 'idle',
  loading = 'loading',
  streaming = 'streaming',
  error = 'error',
  done = 'done',
}

export type TSource = {
  title: string
  description?: string
  path: string
}

export type TChatInteraction = {
  query: string
  response?: string
  sources?: any // should be Results<any> from orama-client
  latest?: boolean
  status: TAnswerStatus
  interactionId?: string
  relatedQueries?: string[]
}

const { state: chatContext, ...chatStore } = createStore({
  chatService: null as ChatService | null,
  interactions: [] as TChatInteraction[],
  sourceBaseURL: '' as string,
  sourcesMap: {
    title: 'title',
    description: 'description',
    path: 'path',
  } as SourcesMap,
  lockScrollOnBottom: true as boolean,
})

export { chatContext, chatStore }
