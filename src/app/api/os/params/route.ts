import { OSParams } from '@/types/os'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const result: OSParams = {
    variants: {
      linux: 'Linux',
      unix: 'Unix',
      other: 'Other',
      windows: 'Windows'
    },
    names: {}
  }

  const linuxNames = {
    debian: 'Debian',
    fedora: 'Fedora',
    ubuntu: 'Ubuntu',
    centos: 'CentOS'
  }

  const unixNames = {
    freebsd: 'FreeBSD',
    openbsd: 'OpenBSD',
    netbsd: 'NetBSD'
  }

  const windowsNames = {
    windows: 'Windows'
  }

  const allNames = {
    ...linuxNames,
    ...unixNames,
    ...windowsNames
  }

  searchParams.getAll('variants').forEach((variant) => {
    if (variant === 'linux') {
      Object.assign(result.names, linuxNames)
    } else if (variant === 'unix') {
      Object.assign(result.names, unixNames)
    } else if (variant === 'windows') {
      Object.assign(result.names, windowsNames)
    }
  })

  if (Object.keys(result.names).length === 0) {
    Object.assign(result.names, allNames)
  }

  return NextResponse.json(result)
}
