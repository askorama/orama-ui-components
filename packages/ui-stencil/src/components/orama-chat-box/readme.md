# orama-chat-box



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute           | Description | Type                                     | Default     |
| --------------- | ------------------- | ----------- | ---------------------------------------- | ----------- |
| `index`         | --                  |             | `{ api_key: string; endpoint: string; }` | `undefined` |
| `placeholder`   | `placeholder`       |             | `any`                                    | `undefined` |
| `sourceBaseURL` | `source-base-u-r-l` |             | `any`                                    | `undefined` |


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
  orama-chat --> orama-textarea
  orama-chat --> orama-button
  orama-chat --> orama-text
  orama-chat-messages-container --> orama-chat-user-message
  orama-chat-messages-container --> orama-chat-assistent-message
  orama-chat-messages-container --> orama-chat-suggestions
  orama-chat-user-message --> orama-text
  orama-chat-assistent-message --> orama-dots-loader
  orama-chat-assistent-message --> orama-text
  orama-chat-assistent-message --> orama-markdown
  orama-chat-assistent-message --> orama-button
  style orama-chat-box fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
