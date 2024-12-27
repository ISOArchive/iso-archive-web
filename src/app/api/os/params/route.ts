import { OSParams } from '@/types/os'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json<OSParams>({
    variants: {
      linux: 'Linux',
      unix: 'Unix',
      other: 'Other',
      windows: 'Windows'
    },
    names: {
      debian: 'Debian',
      fedora: 'Fedora',
      ubuntu: 'Ubuntu',
      centos: 'CentOS',
      freebsd: 'FreeBSD',
      openbsd: 'OpenBSD',
      netbsd: 'NetBSD',
      windows: 'Windows',
      other: 'Other'
    }
  })
}
