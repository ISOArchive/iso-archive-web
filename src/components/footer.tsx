import { Separator } from '@/components/ui/separator'

export const Footer = () => {
  return (
    <footer className='mt-8 text-center text-sm text-muted-foreground'>
      <Separator />
      <p className='my-4'>
        Made with ❤️ by{' '}
        <a className='text-blue-500' href='https://github.com/isoarchive/'>
          ISO Archive Org
        </a>{' '}
        ·{' '}
        <a className='text-blue-500' href='https://discord.gg/97yFvUXVbT'>
          Discord
        </a>
      </p>
    </footer>
  )
}
