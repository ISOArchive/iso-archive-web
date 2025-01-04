export default function Home() {
  return (
    <main>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        ISO Archive
      </h1>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        A collection of ISOs for various operating systems
      </p>
      <h2 className='mt-8 mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        File Name Convention
      </h2>
      <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
        {
          '{OS name}_{version number or build number}[_{disket size}_{floppy size}]_{arch}[_{tags}].{any file extension}'
        }
      </code>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>
        Comma{' '}
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          ,
        </code>{' '}
        at the special tags or archs means multiple extra tags or archs.
      </p>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>
          Disket size
          <ul className='ml-6 list-disc [&>li]:mt-2'>
            <li>5.25</li>
            <li>3.5</li>
          </ul>
        </li>
      </ul>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>
          Floppy file size
          <ul className='ml-6 list-disc [&>li]:mt-2'>
            <li>360KB</li>
            <li>720KB</li>
            <li>1.2MB</li>
            <li>1.44MB</li>
          </ul>
        </li>
      </ul>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>
          Architectures
          <ul className='ml-6 list-disc [&>li]:mt-2'>
            <li>arm64</li>
            <li>arm64e</li>
            <li>arm</li>
            <li>armv7</li>
            <li>mips</li>
            <li>mips64</li>
            <li>x86</li>
            <li>amd64</li>
            <li>ppc</li>
            <li>ppc64</li>
            <li>ppc64le</li>
            <li>m68k</li>
            <li>sparc</li>
            <li>ia64</li>
            <li>hppa</li>
            <li>s390x</li>
            <li>riscv</li>
            <li>riscv64</li>
            <li>loongarch</li>
            <li>loongarch64</li>
          </ul>
        </li>
      </ul>
    </main>
  )
}
