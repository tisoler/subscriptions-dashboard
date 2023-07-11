import { Interval } from "@/types"

export const getIntervals = async (): Promise<Interval[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/intervals`)
    if (res.status !== 200) {
      return null
    }
    const intervals = await res.json()

    return intervals
  } catch (e) {
    console.log(`error: ${e}`)
    return null
  }
}
