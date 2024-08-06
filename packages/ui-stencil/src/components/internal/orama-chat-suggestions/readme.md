# orama-button



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description | Type                           | Default     |
| ------------------- | --------- | ----------- | ------------------------------ | ----------- |
| `as`                | `as`      |             | `"chips" \| "list"`            | `'chips'`   |
| `suggestionClicked` | --        |             | `(suggestion: string) => void` | `undefined` |
| `suggestions`       | --        |             | `string[]`                     | `undefined` |


## Dependencies

### Used by

 - [orama-chat](../orama-chat)
 - [orama-chat-messages-container](../orama-chat-messages-container)
 - [orama-search-results](../orama-search-results)

### Graph
```mermaid
graph TD;
  orama-chat --> orama-chat-suggestions
  orama-chat-messages-container --> orama-chat-suggestions
  orama-search-results --> orama-chat-suggestions
  style orama-chat-suggestions fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
