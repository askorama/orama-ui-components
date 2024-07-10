# search-box

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                                                                                  | Default     |
| ------------- | --------- | ----------- | ------------------------------------------------------------------------------------- | ----------- |
| `color`       | `color`   |             | `"dark" \| "light" \| "system"`                                                       | `undefined` |
| `open`        | `open`    |             | `boolean`                                                                             | `undefined` |
| `themeConfig` | --        |             | `{ colors: { light: { primaryColor: string; }; dark: { primaryColor: string; }; }; }` | `undefined` |


## Dependencies

### Depends on

- [orama-search](../internal/orama-search)
- [orama-chat](../internal/orama-chat)

### Graph
```mermaid
graph TD;
  search-box --> orama-search
  search-box --> orama-chat
  orama-search --> orama-input
  orama-search --> orama-search-results
  orama-search-results --> orama-text
  orama-chat --> orama-chat-messages-container
  orama-chat --> orama-textarea
  orama-chat --> orama-text
  orama-chat-messages-container --> orama-chat-user-message
  orama-chat-messages-container --> orama-chat-assistent-message
  orama-chat-assistent-message --> orama-text
  style search-box fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
