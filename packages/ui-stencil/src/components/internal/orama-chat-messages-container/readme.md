# orama-chat-messages-container



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description | Type                 | Default     |
| -------------- | --------- | ----------- | -------------------- | ----------- |
| `interactions` | --        |             | `TChatInteraction[]` | `undefined` |


## Dependencies

### Used by

 - [orama-chat](../orama-chat)

### Depends on

- [orama-chat-user-message](orama-chat-user-message)
- [orama-chat-assistent-message](orama-chat-assistent-message)
- [orama-chat-suggestions](../orama-chat-suggestions)

### Graph
```mermaid
graph TD;
  orama-chat-messages-container --> orama-chat-user-message
  orama-chat-messages-container --> orama-chat-assistent-message
  orama-chat-messages-container --> orama-chat-suggestions
  orama-chat-user-message --> orama-text
  orama-chat-assistent-message --> orama-dots-loader
  orama-chat-assistent-message --> orama-text
  orama-chat-assistent-message --> orama-sources
  orama-chat-assistent-message --> orama-markdown
  orama-chat-assistent-message --> orama-button
  orama-sources --> orama-text
  orama-chat --> orama-chat-messages-container
  style orama-chat-messages-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
