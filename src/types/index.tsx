export type Interval = {
	id: number,
	description: string,
}

export type PaymentMethod = {
	id: number,
	description: string,
}

export type CreditCardBrand = {
	id: number,
	description: string,
}

export type Subscription = {
	id: number,
	amount: number,
	interval: Interval,
	nextDonation: string,
	paymentMethod: PaymentMethod,
	creditCardBrand: CreditCardBrand,
	totalDonated: number,
	firstDonation: string,
}
