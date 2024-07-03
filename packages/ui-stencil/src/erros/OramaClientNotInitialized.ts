export class OramaClientNotInitializedError extends Error {
  constructor() {
    super('Orama Client is not initialized')
  }
}
