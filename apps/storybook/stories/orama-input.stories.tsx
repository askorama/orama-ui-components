import type { StoryObj, Meta } from "@storybook/html";

const meta = {
  title: "Internal/Form",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const TemplateInput = (args) => `
  <orama-input name='test1' label='Small size input' size='small' placeholder="Your name" type='text'>
  <orama-input name='test2' label='Medium size input' placeholder="Your surname" type='text'>
  <orama-input name='test3' label='Large size input' size='large' placeholder="Your address" type='text'>
`;

export const InputSizes: Story = {
  render: TemplateInput,
  args: {},
};

const TemplateOnlyInput = (args) => `
  <orama-input name='test4' size='large' labelForScreenReaders=${args.labelForScreenReaders} placeholder='Your name' type="text">
`;

export const InputWithoutLabel: Story = {
  render: TemplateOnlyInput,
  args: {
    labelForScreenReaders: "Label for screen readers only"
  },
};

const TemplateInputSearch = (args) => `
  <orama-input name='test4' size='large' labelForScreenReaders=${args.labelForScreenReaders} placeholder='Search...' type="search">
`;

export const SearchInput: Story = {
  render: TemplateInputSearch,
  args: {
    labelForScreenReaders: "Search for something"
  },
};