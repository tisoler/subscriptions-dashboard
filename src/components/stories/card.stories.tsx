import type { Meta, StoryObj } from '@storybook/react'

import Card from '../card'
import { Subscription } from '../../types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta;
type Story = StoryObj<typeof Card>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CardComponent: Story = {
  args: {
    subscription: {
      id: 1,
      amount: 120,
      interval: { id: 2, description: 'Monthly' },
      nextDonation: new Date(),
      paymentMethod: { id: 5, description: 'American Express' },
      totalDonated: 360,
      firstDonationDate: new Date('2022-12-03'),
      endingCardNumber: 8796,
    },
    intervals: [{ id: 1, description: 'Quarterly'}, { id: 2, description: 'Monthly'}, { id: 2, description: 'Annual'}],
    onSave: (subscription: Subscription) => new Promise((resolve, reject) => resolve(true)),
    visible: true,
  },
}
