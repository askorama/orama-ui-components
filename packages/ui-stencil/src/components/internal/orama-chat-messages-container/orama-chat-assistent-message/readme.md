# orama-chat-assistent-message



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                                                                            | Default     |
| ------------- | --------- | ----------- | ------------------------------------------------------------------------------- | ----------- |
| `interaction` | --        |             | `{ query: string; response?: string; sources?: any[]; status: TAnswerStatus; }` | `undefined` |


## Dependencies

### Used by

 - [orama-chat-messages-container](..)

### Depends on

- [orama-dots-loader](../../orama-dots-loader)
- [orama-text](../../orama-text)
- [orama-markdown](orama-markdown)
- [orama-button](../../orama-button)

### Graph
```mermaid
graph TD;
  orama-chat-assistent-message --> orama-dots-loader
  orama-chat-assistent-message --> orama-text
  orama-chat-assistent-message --> orama-markdown
  orama-chat-assistent-message --> orama-button
  orama-chat-messages-container --> orama-chat-assistent-message
  style orama-chat-assistent-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
