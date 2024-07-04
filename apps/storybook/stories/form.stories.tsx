import type { StoryObj, Meta } from "@storybook/html";
import { InputProps } from "ui-stencil";

const meta = {
  title: "Internal/Form",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const TemplateInput = (args: InputProps) => `
  <orama-input name='test1' label='Small size input' size='small' placeholder=${args.placeholder}>
  <orama-input name='test2' label='Medium size input' placeholder=${args.placeholder}>
  <orama-input name='test3' label='Large size input' size='large' placeholder=${args.placeholder}>
`;

export const Input: Story = {
  render: TemplateInput,
  args: {
    placeholder: "Name"
  },
};

const TemplateOnlyInput = (args: InputProps) => `
  <orama-input name='test4' size='large' labelForScreenReaders=${args.labelForScreenReaders} placeholder=${args.placeholder} type="search">
`;

export const InputWithoutLabel: Story = {
  render: TemplateOnlyInput,
  args: {
    placeholder: "Search...",
    labelForScreenReaders: "Label for screen readers only"
  },
};