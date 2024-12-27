'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { OSParams } from '@/types/os'
import { Check, Minus, Plus } from 'lucide-react'
import { use, useReducer } from 'react'

interface ParamsState {
  variants: string[]
  names: string[]
  versions: string[]
  disketteSizes: string[]
  floppySizes: string[]
  archs: string[]
  tags: string[]
}

const paramReducer = (
  state: ParamsState,
  action: {
    type: 'add' | 'remove'
    key: keyof ParamsState
    value?: string
  }
) => {
  switch (action.type) {
    case 'add':
      const addUrl = new URL(window.location.href)
      addUrl.searchParams.append(action.key, action.value!)
      history.pushState(null, '', addUrl.toString())
      return {
        ...state,
        [action.key]: addUrl.searchParams.getAll(action.key)
      }
    case 'remove':
      const removeUrl = new URL(window.location.href)
      removeUrl.searchParams.delete(action.key, action.value)
      history.pushState(null, '', removeUrl.toString())
      return {
        ...state,
        [action.key]: removeUrl.searchParams.getAll(action.key)
      }
  }
}

export const OSList = ({
  osParamsPromise
}: {
  osParamsPromise: Promise<OSParams>
}) => {
  const osParams = use(osParamsPromise)

  const searchParams = new URLSearchParams(window.location.search)

  const [paramState, paramDispatch] = useReducer(paramReducer, {
    variants: searchParams.getAll('variant'),
    names: searchParams.getAll('name'),
    versions: searchParams.getAll('version'),
    disketteSizes: searchParams.getAll('disketteSize'),
    floppySizes: searchParams.getAll('floppySize'),
    archs: searchParams.getAll('arch'),
    tags: searchParams.getAll('tag')
  })

  return (
    <>
      <Sidebar collapsible='none'>
        <SidebarContent>
          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className='cursor-pointer'>
                  OS Variant{' '}
                  <Plus className='ml-auto group-data-[state=open]/collapsible:hidden' />
                  <Minus className='ml-auto group-data-[state=closed]/collapsible:hidden' />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <Command>
                    <CommandInput placeholder='Search OS variant' />
                    <CommandList>
                      <CommandEmpty>No such OS variant found.</CommandEmpty>
                      <CommandGroup>
                        {Object.entries(osParams.variants).map(
                          ([key, value]) => (
                            <CommandItem
                              key={key}
                              value={key}
                              onSelect={(value) => {
                                if (paramState.variants?.includes(value)) {
                                  paramDispatch({
                                    type: 'remove',
                                    key: 'variants',
                                    value: key
                                  })
                                } else {
                                  paramDispatch({
                                    type: 'add',
                                    key: 'variants',
                                    value: key
                                  })
                                }
                              }}
                            >
                              {value}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  paramState.variants.includes(key)
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
      <main></main>
    </>
  )
}
