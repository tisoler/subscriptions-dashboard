'use client'

import { Subscription } from '@/types'
import styles from './page.module.css'
import Card from '../components/card'
import { useState } from 'react'
import { Domine } from 'next/font/google'

const domine = Domine({
  subsets: ['latin'],
})

const INITIAL_SUBSCRIPTIONS = [
  {
    id: 1,
    amount: 100,
    interval: 'Quarterly',
    nextDonation: '2023-05-15',
    paymentMethod: 'ending in 4333',
    totalDonated: 500,
    firstDonation: '2022-02-15'
  },
  {
    id: 2,
    amount: 25,
    interval: 'Monthly',
    nextDonation: '2023-04-12',
    paymentMethod: 'ending in 4335',
    totalDonated: 0,
    firstDonation: '2022-02-15'
  },
  {
    id: 3,
    amount: 250,
    interval: 'Monthly',
    nextDonation: '2023-04-12',
    paymentMethod: 'ending in 4335',
    totalDonated: 0,
    firstDonation: '2022-02-15'
  },
  {
    id: 4,
    amount: 2500,
    interval: 'Monthly',
    nextDonation: '2023-04-12',
    paymentMethod: 'ending in 4335',
    totalDonated: 0,
    firstDonation: '2022-02-15'
  },
  {
    id: 5,
    amount: 500,
    interval: 'Monthly',
    nextDonation: '2023-04-12',
    paymentMethod: 'ending in 4335',
    totalDonated: 0,
    firstDonation: '2022-02-15'
  }
]

export default function Home() {
  const [subscriptions, setSubcriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS)
  const [quantityDiplayed, setQuantityDiplayed] = useState<number>(2)

  const onSave = (subscription: Subscription) => {
    setSubcriptions(prevState => (
      [
        ...prevState.filter(subs => subs.id !== subscription.id),
        subscription
      ]
    ))
  }

  return (
    <main className={styles.main}>
      <div className={styles.titleContainer}><h1 className={`${domine.className} ${styles.title}`}>Subscriptions</h1></div>
      {subscriptions.sort((a, b) => a.id - b.id).map((subscription: Subscription, idx: number) => (
        <Card key={subscription.id} subscription={subscription} visible={idx + 1 <= quantityDiplayed} onSave={onSave} />
      ))}
      <button className={styles.showMoreButton} onClick={() => setQuantityDiplayed(prevState => prevState < subscriptions.length ? prevState + 2 : prevState)}>Show More</button>
      <button className={styles.showMoreButton} onClick={() => setQuantityDiplayed(prevState => prevState - 2 >= 2 ? prevState - 2 : 2)}>Show Less</button>
    </main>
  )
}
