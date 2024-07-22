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

    // TODO: Fix on Orama Client: message event supposed to be emitted as soon as a question is made.
    chatContext.messages = [...chatContext.messages, { role: 'user', content: term }]

    if (!this.answerSession) {
      this.answerSession = this.oramaClient.createAnswerSession({
        events: {
          onMessageChange: (messages) => {
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
