import type { StoryObj, Meta } from '@storybook/html'

const meta: Meta = {
  title: 'Public/SearchBox',
  component: 'search-box'
} satisfies Meta

export default meta
type Story = StoryObj

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const SearchBox: Story = {
  render: () => `
  <div style="height: 800px; width: 360px; border: 1px solid white; overflow: hidden; padding: 8px;"> 
    <search-box open="true"></search-box>
  </div>`
}

export const SearchBoxWithToggler: Story = {
  render: () => `
  <div>
    <search-box-toggler></search-box-toggler>
    <div style="height: 800px; width: 360px; overflow: hidden;"> 
      <search-box></search-box>
    </div>
  </div>`
}
