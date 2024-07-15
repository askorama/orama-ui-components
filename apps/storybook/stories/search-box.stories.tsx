import type { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import type { Components } from 'ui-stencil'
type Story = StoryObj<Components.SearchBox>

const meta: Meta<Components.SearchBox> = {
  title: 'Public/SearchBox',
  component: 'search-box',
}
export default meta

export const SearchBox: Story = {
  render: (args) => html`
  <div style="position: relative; display: flex; align-items: center; justify-content: center;">
    <search-box-toggler></search-box-toggler>
    <search-box
      open=${args.open}
      facet-property=${args.facetProperty}
      result-map=${args.resultMap}
    />
   </div>
  `,

  args: {
    open: true,
    facetProperty: 'category',
    resultMap: {
      description: 'title',
    },
  },
}
