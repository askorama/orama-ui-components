import { Component, h, Prop } from '@stencil/core'

@Component({
  tag: 'orama-chat-suggestions',
  styleUrl: 'orama-chat-suggestions.scss',
  scoped: true,
})
export class OramaChatSuggestions {
  @Prop() suggestions: string[]
  @Prop() as: 'chips' | 'list' = 'chips'
  @Prop() icon: Node
  @Prop() suggestionClicked: (suggestion: string) => void

  handleClick(suggestion: string) {
    this.suggestionClicked(suggestion)
  }

  render() {
    const isChips = this.as === 'chips'
    const isList = this.as === 'list'

    const classSuffix = isChips ? 'chips' : isList ? 'list' : ''

    if (!this.suggestions?.length) {
      return null
    }

    return (
      <ul class={`suggestions-${classSuffix}`}>
        {this.suggestions.map((suggestion) => {
          return (
            <li key={suggestion} class={`suggestion-item-${classSuffix}`}>
              <button
                focus-on-arrow-nav
                type="button"
                class={`suggestion-button-${classSuffix}`}
                onClick={(e) => {
                  e.preventDefault()
                  this.handleClick(suggestion)
                }}
              >
                {this.icon}
                {suggestion}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}
