import type { StoryObj, Meta } from "@storybook/html";
import { ParagraphProps, SpanProps, SmallProps } from "ui-stencil";

const meta = {
  title: "Internal/Typography",
  tags: ["autodocs"],

  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "small", "a"],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const TemplateParagrah = (content: string) => (args: ParagraphProps) => `
  <orama-paragraph as=${args.as}>${content}</orama-paragraph>
`;

export const Paragraph: Story = {
  render: TemplateParagrah("This is a paragraph"),
  args: {
    as: "p",
  },
};

const TemplateSpan = (content: string) => (args: SpanProps) => `
  <orama-span as=${args.as}>${content}</orama-span>
`;

export const Span: Story = {
  render: TemplateSpan("This is a span"),
  args: {
    as: "span",
  },
};


const TemplateSmall = (content: string) => (args: SmallProps) => `
  <orama-small as=${args.as}>${content}</orama-small>
`;

export const Small: Story = {
  render: TemplateSmall("This is a small"),
  args: {
    as: "small",
  },
};