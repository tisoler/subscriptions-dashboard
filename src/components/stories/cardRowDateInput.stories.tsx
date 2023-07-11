import type { Meta, StoryObj } from '@storybook/react'

import CardRowDateInput from '../cardRowDateInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardRowDateInput> = {
  title: 'CardRowDateInput',
  component: CardRowDateInput,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta;
type Story = StoryObj<typeof CardRowDateInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithoutMin: Story = {
  args: {
    label: 'Next Donation',
    value: new Date('2023-07-19'),
    onSave: (newValue: Date) => alert('saved')
  },
}

export const WithMin: Story = {
  args: {
    label: 'Next Donation',
    value: new Date('2023-07-19'),
    min: '2023-07-11',
    onSave: (newValue: Date) => alert('saved')
  },
}
