export type Interval = {
	id: number,
	description: string,
}

export type PaymentMethod = {
	id: number,
	description: string,
}

export type Subscription = {
	id: number,
	amount: number,
	interval: Interval,
	nextDonation: Date,
	paymentMethod: PaymentMethod,
	totalDonated: number,
	firstDonationDate: Date,
	endingCardNumber: number,
}
