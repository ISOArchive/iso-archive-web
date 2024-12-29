/* eslint-disable @next/next/no-img-element */
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const NavBar = () => {
  return (
    <NavigationMenu className='py-4'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), 'gap-2')}
            >
              <img src='/Icon.svg' alt='ISO Archive' className='h-6 w-6' />
              ISO Archive
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/os' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              OS List
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
