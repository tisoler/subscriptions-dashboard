import { Subscription } from "@/types"

export const getSubscriptions = async (): Promise<Subscription[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions`)
    const subscriptions = await res.json()

    return subscriptions
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
