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

    // TODO: possibly fix on Orama Client
    chatContext.interactions = [...chatContext.interactions, { query: term, status: TAnswerStatus.loading }]

    if (!this.answerSession) {
      this.answerSession = this.oramaClient.createAnswerSession({
        events: {
          onStateChange: (state) => {
            const latestState = state[state.length - 1]

            const loading = latestState.loading
            const response = latestState.response

            // biome-ignore lint/suspicious/noExplicitAny: Client should expose this type
            const sources = (latestState.sources as any)?.map((source) => {
              // TODO: this should depend on the source type
              return {
                title: source.document?.title,
                description: source.document?.content,
                path: source.document?.path,
              }
            })

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
                  sources,
                  interactionId: latestState.interactionId,
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

    return this.answerSession.ask({ term: term }).catch((error) => {
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
    chatContext.interactions = []
  }
}
