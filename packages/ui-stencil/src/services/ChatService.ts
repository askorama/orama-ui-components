import type { OramaClient, AnswerSession } from '@oramacloud/client'
import { OramaClientNotInitializedError } from '@/erros/OramaClientNotInitialized'
import { chatContext } from '@/context/chatContext'

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

    if (!this.answerSession) {
      this.answerSession = this.oramaClient.createAnswerSession({
        events: {
          onMessageChange: (messages) => {
            // TODO: Fix on Orama Client: message event supposed to be emitted as soon as a question is made.
            // And at least user message should be available right away
            chatContext.messages = [...messages]
          },
          onMessageLoading: (loading) => (chatContext.isLoading = loading),
          onSourceChange: (sources) => {
            console.log(sources)
          },
        },
      })
    }

    chatContext.isLoading = true
    chatContext.error = false
    return this.answerSession
      .ask({ term: term })
      .catch((error) => {
        chatContext.error = true
        console.error(error)
      })
      .finally(() => {
        chatContext.isLoading = false
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
