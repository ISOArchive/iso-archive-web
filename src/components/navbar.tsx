/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ModeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'

export const NavBar = () => {
  return (
    <nav className='flex justify-center items-center py-4'>
      <Link href='/' legacyBehavior passHref>
        <Button variant='ghost'>
          <img src='/Icon.svg' alt='ISO Archive' className='h-8 w-8' />
          ISO Archive
        </Button>
      </Link>
      <Link href='/os' legacyBehavior passHref>
        <Button variant='ghost'>OS List</Button>
      </Link>
      <Link href='/contact' legacyBehavior passHref>
        <Button variant='ghost'>Contact</Button>
      </Link>
      <div className='ml-auto flex gap-4'>
        <ModeToggle />
      </div>
    </nav>
  )
}
