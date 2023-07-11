import type { Meta, StoryObj } from '@storybook/react'

import CardRowSelect from '../cardRowSelect'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardRowSelect> = {
  title: 'CardRowSelect',
  component: CardRowSelect,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta;
type Story = StoryObj<typeof CardRowSelect>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const RowSelect: Story = {
  args: {
    label: 'Interval',
    value: 2,
    options: [{ id: 1, description: 'Quarterly'}, { id: 2, description: 'Monthly'}, { id: 2, description: 'Annual'}],
    onSave: (newValue: number | string) => alert('saved')
  },
}
