# orama-search



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default |
| ------------ | ------------- | ----------- | --------- | ------- |
| `focusInput` | `focus-input` |             | `boolean` | `false` |


## Dependencies

### Used by

 - [orama-search-box](../../orama-search-box)

### Depends on

- [orama-input](../orama-input)
- [orama-chat-button](../orama-chat-button)
- [orama-facets](../orama-facets)
- [orama-search-results](../orama-search-results)

### Graph
```mermaid
graph TD;
  orama-search --> orama-input
  orama-search --> orama-chat-button
  orama-search --> orama-facets
  orama-search --> orama-search-results
  orama-search-results --> orama-text
  orama-search-box --> orama-search
  style orama-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
