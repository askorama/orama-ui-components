import { Component, h, Prop } from '@stencil/core'

@Component({
  tag: 'orama-chat-suggestions',
  styleUrl: 'orama-chat-suggestions.scss',
})
export class OramaChatSuggestions {
  @Prop() suggestions: string[]
  @Prop() suggestionClicked: (suggestion: string) => void

  handleClick(suggestion: string) {
    this.suggestionClicked(suggestion)
  }

  render() {
    if (!this.suggestions?.length) {
      return null
    }

    return (
      <ul class="suggestions-list">
        {this.suggestions.map((suggestion) => {
          return (
            <li key={suggestion} class="suggestion">
              <button type="button" class="suggestion-button" onClick={() => this.handleClick(suggestion)}>
                {suggestion}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}
