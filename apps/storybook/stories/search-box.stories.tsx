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
  // TODO: We need to find a away to pass complex objects here so we can manipulate the args with the storybook controls
  return `
  <div>
    <search-box-toggler></search-box-toggler>
    <search-box facet-property="${args.facetProperty}" open="${args.open}"></search-box>
  </div>`
}

export const SearchBox: Story = {
  render: Template,
  args: {
    facetProperty: 'category',
    open: true,
  },
}
