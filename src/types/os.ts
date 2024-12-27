export enum DisketteSize {
  ThreeAndAHalf = '3.5',
  FiveAndAQuarter = '5.25'
}

export enum FloppySize {
  ThreeAndAHalfHD = '1.44MB',
  FiveAndAQuarterHD = '1.2MB',
  ThreeAndAHalfDD = '720KB',
  FiveAndAQuarterDD = '360KB'
}

export enum Arch {
  Arm64 = 'arm64',
  Arm64e = 'arm64e',
  Arm = 'arm',
  Mips = 'mips',
  X86 = 'x86',
  X86_64 = 'x86_64',
  Ppc = 'ppc',
  Ppc64 = 'ppc64',
  Ppc64LE = 'ppc64le',
  M68k = 'm68k',
  Sparc = 'sparc',
  Ia64 = 'ia64',
  Hppa = 'hppa',
  S390x = 's390x'
}

export interface OS {
  name: string
  version: string
  disketteSize: DisketteSize
  floppySize: FloppySize
  arch: Arch
  tags: string[]
  extension: string
  size: number
  url: string
}

export interface OSParams {
  variants: {
    [key: string]: string
  }
  names: {
    [key: string]: string
  }
  versions: {
    [key: string]: string
  }
  disketteSizes: {
    [key: string]: string
  }
  floppySizes: {
    [key: string]: string
  }
  archs: {
    [key: string]: string
  }
  tags: {
    [key: string]: string
  }
}
