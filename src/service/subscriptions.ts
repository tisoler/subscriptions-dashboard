import { Subscription } from "@/types"

export const getSubscriptions = async (): Promise<Subscription[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions`)
    if (res.status !== 200) {
      return null
    }
    const subscriptions = await res.json()

    return subscriptions
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}

export const updateSubscription = async (payload: Subscription): Promise<Subscription | null> => {
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions`, requestOptions)
    if (res.status !== 200) {
      return null
    }
    const updatedSubscription = await res.json()

    return updatedSubscription
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
