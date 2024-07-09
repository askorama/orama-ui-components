import type { StoryObj, Meta } from '@storybook/web-components'

const meta: Meta = {
  title: 'Internal/OramaSearch',
  component: 'orama-search'
}

export default meta
type Story = StoryObj

const Template = (args) => {
  return `
  <div style="height: 800px; width: 360px; border: 1px solid white; display: flex; flex-direction: column;">
    <orama-search ${{ ...args }}></orama-chat>
  </div>
  
  `
}

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const OramaSearch: Story = {
  render: Template,
  args: {}
}
