'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table'
import type { OS } from '@/types/os'
import { ColumnDef } from '@tanstack/react-table'
import { Download } from 'lucide-react'
import { filesize } from 'filesize'

export const OSListColumns: ColumnDef<OS>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    )
  },
  {
    accessorKey: 'version',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Version' />
    )
  },
  {
    accessorKey: 'arch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Arch' />
    )
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tags' />
    ),
    cell: ({ cell }) => {
      const tags = cell.getValue<string[]>()

      return (
        <div className='flex flex-wrap gap-1'>
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: 'disketteSize',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Diskette Size' />
    )
  },
  {
    accessorKey: 'floppySize',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Floppy Size' />
    )
  },
  {
    accessorKey: 'extension',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Extension' />
    )
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Size'
        className='text-right'
      />
    ),
    cell: ({ cell }) => {
      const size = cell.getValue<number>()

      return filesize(size, { round: 1 })
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { url } = row.original

      return (
        <Button
          variant='ghost'
          className='h-8 w-8 p-0'
          onClick={() => window.open(url, '_blank')}
        >
          <span className='sr-only'>Download</span>
          <Download className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  }
]
