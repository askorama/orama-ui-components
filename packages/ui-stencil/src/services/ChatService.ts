import type { OramaClient, AnswerSession } from '@oramacloud/client'
import { OramaClientNotInitializedError } from '@/erros/OramaClientNotInitialized'
import { chatContext, TAnswerStatus } from '@/context/chatContext'

export class ChatService {
  oramaClient: OramaClient
  answerSession: AnswerSession

  constructor(oramaClient: OramaClient) {
    this.oramaClient = oramaClient
  }

  sendQuestion = (term: string) => {
    if (!this.oramaClient) {
      throw new OramaClientNotInitializedError()
    }

    chatContext.lockScrollOnBottom = true

    // TODO: possibly fix on Orama Client
    chatContext.interactions = [...chatContext.interactions, { query: term, status: TAnswerStatus.loading }]

    if (!this.answerSession) {
      this.answerSession = this.oramaClient.createAnswerSession({
        events: {
          onStateChange: (state) => {
            const latestState = state[state.length - 1]

            const loading = latestState.loading
            const response = latestState.response

            let answerStatus = TAnswerStatus.loading

            if (loading && response) {
              answerStatus = TAnswerStatus.streaming
            } else if (!loading && response) {
              answerStatus = TAnswerStatus.done
            }

            chatContext.interactions = chatContext.interactions.map((interaction, index) => {
              if (index === chatContext.interactions.length - 1) {
                return {
                  ...interaction,
                  response,
                  sources: (latestState.sources as any)?.map((source) => source.document),
                  interactionId: latestState.interactionId,
                  relatedQueries: latestState.relatedQueries,
                  status: answerStatus,
                  latest: true,
                }
              }
              return { ...interaction, latest: false }
            })
          },
        },
      })
    }

    // TODO: WE may want to reveive ask props as a Service prop instead of enforcing it here
    return this.answerSession.ask({ term: term, related: { howMany: 3, format: 'question' } }).catch((error) => {
      chatContext.interactions = chatContext.interactions.map((interaction, index) => {
        if (index === chatContext.interactions.length - 1) {
          return {
            ...interaction,
            status: TAnswerStatus.error,
          }
        }
        return interaction
      })
      console.error(error)
    })
  }

  abortAnswer = () => {
    if (!this.answerSession) {
      throw new OramaClientNotInitializedError()
    }

    this.answerSession.abortAnswer()
  }

  regenerateLatest = async () => {
    if (!this.answerSession) {
      throw new OramaClientNotInitializedError()
    }

    this.answerSession.regenerateLast({ stream: false })
  }

  resetChat = async () => {
    if (!this.answerSession) {
      throw new OramaClientNotInitializedError()
    }

    this.answerSession.clearSession()
    // TODO: Not sure if this is the right place to do it
    chatContext.lockScrollOnBottom = true
    chatContext.interactions = []
  }
}
