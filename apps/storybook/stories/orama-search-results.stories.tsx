import type { StoryObj, Meta } from "@storybook/html";

const meta = {
  title: "Internal/Search Results",
  component: "orama-search-results",
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Template = (args) => `
  <orama-search-results ${{ ...args }}></orama-search-results>
`;

export const Default: Story = {
  render: Template,
  args: {},
};