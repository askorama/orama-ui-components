import type { StoryObj, Meta } from "@storybook/html";
import { ParagraphProps } from "ui-stencil";

const meta = {
  title: "Internal/Typography",
  tags: ["autodocs"],

  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "small"],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Template = (content: string) => (args: ParagraphProps) => `<orama-paragraph {...args}>${content}</orama-paragraph>`;

export const Paragraph: Story = {
  render: Template("This is a paragraph"),
  args: {
    as: "p",
  },
};