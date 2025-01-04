export default function Page() {
  return (
    <main>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Contact
      </h1>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>
          Email:{' '}
          <a className='text-blue-500' href='mailto:email@isoarchives.org'>
            email@isoarchives.org
          </a>
          <ul className='ml-6 list-disc [&>li]:mt-2'>
            <li>ISO removal requests can be made through this email.</li>
          </ul>
        </li>
        <li>
          GitHub:{' '}
          <a className='text-blue-500' href='https://github.com/isoarchive/'>
            https://github.com/isoarchive/
          </a>
        </li>
        <li>
          Discord:{' '}
          <a className='text-blue-500' href='https://discord.gg/97yFvUXVbT'>
            https://discord.gg/97yFvUXVbT
          </a>
        </li>
      </ul>
    </main>
  )
}
