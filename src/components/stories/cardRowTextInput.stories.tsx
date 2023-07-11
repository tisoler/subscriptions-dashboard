import type { Meta, StoryObj } from '@storybook/react'

import CardRowTextInput from '../cardRowTextInput'
import VisaIcon from '../../assets/icons/visaLogo';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardRowTextInput> = {
  title: 'CardRowTextInput',
  component: CardRowTextInput,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta;
type Story = StoryObj<typeof CardRowTextInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ReadOnly: Story = {
  args: {
    label: 'Total donated',
    value: '$1210 since Jun 13, 2022',
    onSave: (newValue: string | number) => alert('saved'),
    editable: false,
  },
}

export const Editable: Story = {
  args: {
    label: 'Name',
    value: 'Carla',
    onSave: (newValue: string | number) => alert('saved'),
  },
}

export const Currency: Story = {
  args: {
    label: 'Amount',
    value: 132,
    onSave: (newValue: string | number) => alert('saved'),
    isCurrency: true
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Amount',
    value: 'ending in 4333',
    onSave: (newValue: string | number) => alert('saved'),
    icon: VisaIcon(),
    editable: false,
  },
}
