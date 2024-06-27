import type { StoryObj, Meta } from "@storybook/html";

// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta = {
  title: "Example/Button",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Template = (args) => `<my-button label=${args.label}></my-component>`;

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Button: Story = {
  // render: Template,
  args: {
    label: "Button 123 asa sdasd",
  },
};
