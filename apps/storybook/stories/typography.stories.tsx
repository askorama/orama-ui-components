import type { StoryObj, Meta } from "@storybook/html";

const meta = {
  title: "Internal/Typography",
  tags: ["autodocs"],

  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "small", "a"],
    },
    styledAs: {
      control: { type: "select" },
      options: ["p", "span", "small"],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Template = (content: string) => (args) => `
  <orama-text as=${args.as} styled-as=${args.styledAs} class=${args.class}>${content}</orama-text>
`;

export const Paragraph: Story = {
  render: Template("This is a paragraph"),
  args: {
    as: "p",
    class: "my-optional-class",
  },
};

export const Span: Story = {
  render: Template("This is a span"),
  args: {
    as: "span",
    class: "my-optional-class",
  },
};

export const Small: Story = {
  render: Template("This is a small"),
  args: {
    as: "small",
    class: "my-optional-class",
  },
};