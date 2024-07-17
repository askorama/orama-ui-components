# orama-chat-box



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description | Type                                     | Default     |
| ------------ | --------- | ----------- | ---------------------------------------- | ----------- |
| `cloudIndex` | --        |             | `{ api_key: string; endpoint: string; }` | `undefined` |


## Dependencies

### Depends on

- [orama-text](../internal/orama-text)
- [orama-chat](../internal/orama-chat)

### Graph
```mermaid
graph TD;
  orama-chat-box --> orama-text
  orama-chat-box --> orama-chat
  orama-chat --> orama-chat-messages-container
  orama-chat --> orama-chat-suggestions
  orama-chat --> orama-logo-icon
  orama-chat --> orama-textarea
  orama-chat --> orama-button
  orama-chat --> orama-text
  orama-chat-messages-container --> orama-chat-user-message
  orama-chat-messages-container --> orama-chat-assistent-message
  orama-chat-assistent-message --> orama-button
  orama-chat-assistent-message --> orama-text
  style orama-chat-box fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
