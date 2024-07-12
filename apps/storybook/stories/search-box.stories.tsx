import type { StoryObj, Meta } from '@storybook/html'

const meta: Meta = {
  title: 'Public/SearchBox',
  component: 'search-box',

  argTypes: {
    facetProperty: {
      control: { type: 'text' },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
const Template = (args) => {
  return `
    <search-box open="true" facet-property=${args.facetProperty}></search-box>
  `
}

export const SearchBox: Story = {
  render: Template,
  args: {
    class: 'my-optional-class',
    facetProperty: 'category',
  },
}

export const SearchBoxWithToggler: Story = {
  render: () => `
  <div>
    <search-box-toggler></search-box-toggler>
    <div style="height: 800px; width: 360px; overflow: hidden;"> 
      <search-box></search-box>
    </div>
  </div>`,
}
