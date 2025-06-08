
import { InputText } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputText> = {
  title: 'Components/Forms/InputText',
  component: InputText,
  decorators: [
    Story => (
      <div className='max-w-screen-lg mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'url', 'search'],
      description: 'This is type of the input',
    },
    labelText: {
      control: 'text',
      description: 'This is label of the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to user',
    },
    placeholder: {
      control: 'text',
      description: 'Example for use  input',
    },
    required: {
      control: 'boolean',
      description: 'Field disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Only read',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputText>;
export const Default: Story = {
  args: {
    type: 'text',
    labelText: 'Input Label',
    errorMessage: '',
    placeholder: 'Write something...',
    required: true,
    disabled: false,
    readOnly: false,
    defaultValue: 'This is the default value',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'This is message error',
  },
};

export const Disabeld: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};
