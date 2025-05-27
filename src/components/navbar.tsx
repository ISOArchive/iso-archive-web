/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ModeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'

export const NavBar = () => {
  return (
    <nav className='flex justify-center items-center py-4'>
      <Button variant='ghost' asChild>
        <Link href='/'>
          <img src='/Icon.svg' alt='ISO Archive' className='h-8 w-8' />
          ISO Archive
        </Link>
      </Button>
      <Button variant='ghost' asChild>
        <Link href='/os'>OS List</Link>
      </Button>
      <Button variant='ghost' asChild>
        <Link href='/contact'>Contact</Link>
      </Button>
      <div className='ml-auto flex gap-4'>
        <ModeToggle />
      </div>
    </nav>
  )
}
