import { Arch, type OS } from '@/types/os'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const result: OS[] = [
    {
      variant: 'linux',
      name: 'Debian',
      version: '11',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'desktop'],
      extension: 'iso',
      size: 3.7 * 1024 * 1024 * 1024,
      url: 'https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-11.1.0-amd64-netinst.iso'
    },
    {
      variant: 'linux',
      name: 'Fedora',
      version: '34',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'desktop'],
      extension: 'iso',
      size: 2.8 * 1024 * 1024 * 1024,
      url: 'https://download.fedoraproject.org/pub/fedora/linux/releases/34/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-34-1.2.iso'
    },
    {
      variant: 'linux',
      name: 'Ubuntu',
      version: '21.04',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'desktop'],
      extension: 'iso',
      size: 2.8 * 1024 * 1024 * 1024,
      url: 'https://releases.ubuntu.com/21.04/ubuntu-21.04-desktop-amd64.iso'
    },
    {
      variant: 'linux',
      name: 'CentOS',
      version: '8.4.2105',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'server'],
      extension: 'iso',
      size: 6.9 * 1024 * 1024 * 1024,
      url: 'https://mirror.centos.org/centos/8.4.2105/isos/x86_64/CentOS-8.4.2105-x86_64-dvd1.iso'
    },
    {
      variant: 'unix',
      name: 'FreeBSD',
      version: '13.0',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'desktop'],
      extension: 'iso',
      size: 1.9 * 1024 * 1024 * 1024,
      url: 'https://download.freebsd.org/ftp/releases/ISO-IMAGES/13.0/FreeBSD-13.0-RELEASE-amd64-disc1.iso'
    },
    {
      variant: 'unix',
      name: 'OpenBSD',
      version: '6.9',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'desktop'],
      extension: 'iso',
      size: 1.1 * 1024 * 1024 * 1024,
      url: 'https://cdn.openbsd.org/pub/OpenBSD/6.9/amd64/install69.iso'
    },
    {
      variant: 'unix',
      name: 'NetBSD',
      version: '9.2',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'desktop'],
      extension: 'iso',
      size: 1.9 * 1024 * 1024 * 1024,
      url: 'https://cdn.netbsd.org/pub/NetBSD/NetBSD-9.2/amd64/installation/cdrom/boot.iso'
    },
    {
      variant: 'windows',
      name: 'Windows',
      version: '11',
      arch: Arch.AMD64,
      tags: ['multilanguage', 'desktop'],
      extension: 'iso',
      size: 5.3 * 1024 * 1024 * 1024,
      url: 'https://software-download.microsoft.com/download/pr/22000.194/22000.194.210604-1628.co_release_CLIENT_CONSUMER_x64FRE_en-us.iso'
    }
  ]

  return NextResponse.json(
    result.filter((os) => {
      const state: boolean[] = []
      if (searchParams.has('variants')) {
        state.push(
          searchParams.getAll('variants').includes(os.variant.toLowerCase())
        )
      }
      if (searchParams.has('names')) {
        state.push(searchParams.getAll('names').includes(os.name.toLowerCase()))
      }
      if (searchParams.has('versions')) {
        state.push(
          searchParams.getAll('versions').includes(os.version.toLowerCase())
        )
      }
      if (searchParams.has('archs')) {
        state.push(searchParams.getAll('archs').includes(os.arch.toLowerCase()))
      }
      if (searchParams.has('tags')) {
        state.push(
          searchParams
            .getAll('tags')
            .some((tag) => os.tags.includes(tag.toLowerCase()))
        )
      }
      if (searchParams.has('search')) {
        state.push(
          Object.values(os).some((value) => {
            if (typeof value === 'string') {
              return value
                .toLowerCase()
                .includes(searchParams.get('search')!.toLowerCase())
            } else if (Array.isArray(value)) {
              return value.some((v) =>
                v
                  .toLowerCase()
                  .includes(searchParams.get('search')!.toLowerCase())
              )
            }
            return false
          })
        )
      }

      return state.every((s) => s)
    })
  )
}
