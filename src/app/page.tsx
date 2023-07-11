'use client'

import { Interval, Subscription } from '@/types'
import styles from './page.module.css'
import Card from '../components/card'
import { useEffect, useState } from 'react'
import { Domine } from 'next/font/google'
import { getSubscriptions, updateSubscription } from '@/service/subscriptions'
import { getIntervals } from '@/service/interval'

const domine = Domine({
  subsets: ['latin'],
})

export default function Home() {
  const [subscriptions, setSubcriptions] = useState<Subscription[]>([])
  const [quantityDiplayed, setQuantityDiplayed] = useState<number>(2)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [intervals, setIntervals] = useState<Interval[]>([])

  useEffect(() => {
    setIsLoading(true)
    const getAllSubscriptions = async () => {
      const subs = await getSubscriptions()
      setSubcriptions(subs || [])
    }

    const getAllIntervals = async () => {
      const interv = await getIntervals()
      setIntervals(interv || [])
    }

    getAllIntervals()
      .then(() => getAllSubscriptions())
      .then(() => setIsLoading(false))
  }, [])

  const onSave = async (subscription: Subscription) => {
    const updatedSubscription = await updateSubscription(subscription)
    if (updatedSubscription) {
      setSubcriptions(prevState => (
        [
          ...prevState.filter(subs => subs.id !== subscription.id),
          updatedSubscription
        ]
      ))
      return true
    }
    return false
  }

  if (isLoading) return <main className={styles.main}>Loading...</main>

  return (
    <main className={styles.main}>
      <div className={styles.titleContainer}><h1 className={`${domine.className} ${styles.title}`}>Subscriptions</h1></div>
      {
        subscriptions.length ? (
          <>
            {subscriptions.sort((a, b) => a.id - b.id).map((subscription: Subscription, idx: number) => (
              <Card
                key={subscription.id}
                intervals={intervals}
                subscription={subscription}
                visible={idx + 1 <= quantityDiplayed}
                onSave={onSave}
              />
            ))}
            <button className={styles.showMoreButton} onClick={() => setQuantityDiplayed(prevState => prevState < subscriptions.length ? prevState + 2 : prevState)}>Show More</button>
            <button className={styles.showMoreButton} onClick={() => setQuantityDiplayed(prevState => prevState - 2 >= 2 ? prevState - 2 : 2)}>Show Less</button>
          </>
        ) : (
          <>No subscriptions yet...</>
        )
      }
    </main>
  )
}
