# orama-modal



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description | Type      | Default |
| --------------------- | ------------------------ | ----------- | --------- | ------- |
| `closeOnEscape`       | `close-on-escape`        |             | `boolean` | `true`  |
| `closeOnOutsideClick` | `close-on-outside-click` |             | `boolean` | `true`  |
| `mainTitle`           | `main-title`             |             | `string`  | `''`    |
| `open`                | `open`                   |             | `boolean` | `false` |


## Events

| Event                | Description | Type                                               |
| -------------------- | ----------- | -------------------------------------------------- |
| `modalStatusChanged` |             | `CustomEvent<{ open: boolean; id: HTMLElement; }>` |


## Dependencies

### Used by

 - [orama-search-box](../../orama-search-box)

### Graph
```mermaid
graph TD;
  orama-search-box --> orama-modal
  style orama-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
