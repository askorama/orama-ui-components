# orama-search-results

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type                      | Default     |
| ------------ | ------------- | ----------- | ------------------------- | ----------- |
| `searchTerm` | `search-term` |             | `string`                  | `undefined` |
| `sections`   | --            |             | `SearchResultBySection[]` | `[]`        |


## Events

| Event            | Description | Type                                                                             |
| ---------------- | ----------- | -------------------------------------------------------------------------------- |
| `oramaItemClick` |             | `CustomEvent<{ id: string; title: string; description: string; path: string; }>` |


## Dependencies

### Used by

 - [orama-search](../orama-search)

### Depends on

- [orama-text](../orama-text)

### Graph
```mermaid
graph TD;
  orama-search-results --> orama-text
  orama-search --> orama-search-results
  style orama-search-results fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
