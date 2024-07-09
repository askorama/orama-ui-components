# orama-chat



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [search-box](../../search-box)

### Depends on

- [orama-chat-messages-container](../orama-chat-messages-container)
- [orama-textarea](../orama-textarea)
- [orama-text](../orama-text)

### Graph
```mermaid
graph TD;
  orama-chat --> orama-chat-messages-container
  orama-chat --> orama-textarea
  orama-chat --> orama-text
  orama-chat-messages-container --> orama-chat-user-message
  orama-chat-messages-container --> orama-chat-assistent-message
  orama-chat-assistent-message --> orama-text
  search-box --> orama-chat
  style orama-chat fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
