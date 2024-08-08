import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import demoIndexes from '../config'
import { html } from 'lit-html'

const meta: Meta<Components.OramaSearchButton> = {
  title: 'Components/SearchButton',
  component: 'orama-search-button',
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaSearchButton>

const Template = (args) => {
  return html`
    <div>
      <orama-search-button label="${args.label}" id="orama-ui-search-button"></orama-search-button>
      <orama-search-box
        .open=${false}
        .index=${demoIndexes.orama.index}
        .placeholder=${demoIndexes.orama.placeholder}
        .sourceBaseUrl=${demoIndexes.orama.sourceBaseUrl}
        .sourcesMap=${demoIndexes.orama.sourcesMap}
        .suggestions=${demoIndexes.orama.suggestions}
      >
      </orama-search-box>
    </div>
  `
}

export const SearchButton: Story = {
  render: Template,
  args: {
    label: 'Search...',
  },
}
