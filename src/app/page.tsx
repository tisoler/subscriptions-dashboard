'use client';
import styled from 'styled-components'
import { Subscription } from '@/types';
import styles from './page.module.css'
import Card from '@/components/card';
import { useState } from 'react';

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
  }
]

export default function Home() {
  const [subscriptions, setSubcriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS)

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
      <TitleContainer><Title>Subscriptions</Title></TitleContainer>
      {subscriptions.sort((a, b) => a.id - b.id).map(subscription => (
        <Card key={subscription.id} subscription={subscription} onSave={onSave} />
      ))}
    </main>
  )
}

const TitleContainer = styled.div`
  display: flex;
  width: 582px;
  margin-bottom: 18px;
  padding-left: 2.1rem;
`

const Title = styled.h1`
  font-family: Domine;
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
`
