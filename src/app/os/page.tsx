import { SidebarProvider } from '@/components/ui/sidebar'
import { LoaderCircle } from 'lucide-react'
import { Suspense } from 'react'
import { OSList } from './oslist'

export default function Page() {
  const osParams = fetch('http://localhost:3000/api/os/params').then((res) =>
    res.json()
  )

  return (
    <SidebarProvider>
      <Suspense
        fallback={
          <div className='mx-auto p-4'>
            <LoaderCircle className='animate-spin w-4 h-4' />
          </div>
        }
      >
        <OSList osParamsPromise={osParams} />
      </Suspense>
    </SidebarProvider>
  )
}
