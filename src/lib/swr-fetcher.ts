import useSWR from 'swr'
import { toast } from 'sonner'

export const useSWRFetcher = <T>(
  url: string,
  options?: RequestInit,
  swrOptions?: { refreshInterval?: number }
) => {

  return useSWR<T>(
    url,
    async (): Promise<Awaited<T>> => {
      const res = await fetch(url, options)
      if (!res.ok) {
        console.error('Failed to fetch data:', res.status, res.statusText)
        toast('Error!', {
          description: 'Failed to request data'
        })
        throw new Error('Failed to fetch data')
      }
      return (await res.json()) as Awaited<T>
    },
    swrOptions
  )
}
