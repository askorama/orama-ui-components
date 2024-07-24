import type { OramaClient, AnswerSession } from '@oramacloud/client'
import { OramaClientNotInitializedError } from '@/erros/OramaClientNotInitialized'
import { chatContext, type TAnswerStatus } from '@/context/chatContext'

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
    chatContext.error = false

    // TODO: possibly fix on Orama Client
    chatContext.interactions = [...chatContext.interactions, { query: term, status: 'loading' }]

    if (!this.answerSession) {
      this.answerSession = this.oramaClient.createAnswerSession({
        events: {
          onStateChange: (state) => {
            const latestState = state[state.length - 1]

            const loading = latestState.loading
            const response = latestState.response

            const sources = (latestState.sources as any)?.map((source) => {
              // TODO: this should depend on the source type
              return {
                title: source.document?.title,
                description: source.document?.content,
              }
            })

            let answerStatus = 'loading' as TAnswerStatus

            if (loading && response) {
              answerStatus = 'streaming'
            }

            if (!loading && response) {
              answerStatus = 'done'
            }

            chatContext.interactions = chatContext.interactions.map((interaction, index) => {
              if (index === chatContext.interactions.length - 1) {
                return {
                  ...interaction,
                  response,
                  sources,
                  status: answerStatus,
                }
              }
              return interaction
            })
          },
        },
      })
    }

    chatContext.error = false
    return this.answerSession.ask({ term: term }).catch((error) => {
      chatContext.error = true
      console.error(error)
    })
  }

  abortAnswer = () => {
    if (!this.answerSession) {
      throw new OramaClientNotInitializedError()
    }

    this.answerSession.abortAnswer()
  }

  // TODO
  resendLatest = () => {
    throw new Error('Not implemented')
  }
}
