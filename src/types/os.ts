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
  Alpha = 'alpha',
  Arm64 = 'arm64',
  Arm64e = 'arm64e',
  Arm = 'arm',
  Armv7 = 'armv7',
  Mips = 'mips',
  Mips64 = 'mips64',
  X86 = 'x86',
  AMD64 = 'amd64',
  Ppc = 'ppc',
  Ppc64 = 'ppc64',
  Ppc64LE = 'ppc64le',
  M68k = 'm68k',
  Sparc = 'sparc',
  Ia64 = 'ia64',
  Hppa = 'hppa',
  S390 = 's390',
  S390x = 's390x',
  RiscV = 'riscv',
  RiscV64 = 'riscv64',
  Loongarch = 'loongarch',
  Loongarch64 = 'loongarch64'
}

export interface OS {
  variant: string
  name: string
  version: string
  disketteSize?: DisketteSize
  floppySize?: FloppySize
  arch: Arch[]
  tags: string[]
  extension: string
  size: number
  url: string
}

export type OSParams = Record<string, string[]>

export const OSParamsText = {
  variants: 'Variant',
  names: 'Name',
  versions: 'Version',
  disketteSizes: 'Diskette Size',
  floppySizes: 'Floppy Size',
  archs: 'Arch',
  tags: 'Tags'
}
