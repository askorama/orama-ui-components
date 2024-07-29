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

    if (!this.answerSession) {
      this.answerSession = this.oramaClient.createAnswerSession({
        events: {
          onStateChange: (state) => {
            chatContext.interactions = state.map((interaction, index) => {
              let answerStatus = TAnswerStatus.loading

              if (interaction.loading && interaction.response) {
                answerStatus = TAnswerStatus.streaming
              } else if (!interaction.loading && interaction.response) {
                answerStatus = TAnswerStatus.done
              }

              // biome-ignore lint/suspicious/noExplicitAny: Client should expose this type
              const sources = (interaction.sources as any)?.map((source) => {
                // TODO: this should depend on the source type
                return {
                  title: source.document?.title,
                  description: source.document?.content,
                  path: source.document?.path,
                }
              })

              return {
                query: interaction.query,
                interactionId: interaction.interactionId,
                response: interaction.response,
                relatedQueries: interaction.relatedQueries,
                status: answerStatus,
                latest: state.length - 1 === index,
                sources,
              }
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
  }
}
