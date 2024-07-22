# orama-chat-assistent-message



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                                | Default     |
| --------- | --------- | ----------- | --------------------------------------------------- | ----------- |
| `message` | --        |             | `{ role: "user" \| "assistant"; content: string; }` | `undefined` |


## Dependencies

### Used by

 - [orama-chat-messages-container](..)

### Depends on

- [orama-markdown](orama-markdown)
- [orama-button](../../orama-button)
- [orama-text](../../orama-text)

### Graph
```mermaid
graph TD;
  orama-chat-assistent-message --> orama-markdown
  orama-chat-assistent-message --> orama-button
  orama-chat-assistent-message --> orama-text
  orama-chat-messages-container --> orama-chat-assistent-message
  style orama-chat-assistent-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
