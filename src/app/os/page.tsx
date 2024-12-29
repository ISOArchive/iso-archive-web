'use client'

import { Button } from '@/components/ui/button'
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
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar
} from '@/components/ui/sidebar'
import { useSWRFetcher } from '@/lib/swr-fetcher'
import { cn } from '@/lib/utils'
import { OSParamsText, type OS, type OSParams } from '@/types/os'
import { Check, LoaderCircle, Minus, PanelLeft, Plus } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useReducer } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { OSListColumns } from './columns'

type ParamsState = Record<string, string[]>

const paramReducer = (
  state: ParamsState,
  action: {
    type: 'add' | 'remove' | 'set'
    key: keyof ParamsState
    value?: string
  }
): Record<string, string[]> => {
  switch (action.type) {
    case 'add':
      if (state[action.key]) {
        return {
          ...state,
          [action.key]: [...state[action.key], action.value!]
        }
      } else {
        return {
          ...state,
          [action.key]: [action.value!]
        }
      }
    case 'remove':
      if (state[action.key]) {
        return {
          ...state,
          [action.key]: action.value
            ? state[action.key].filter((value) => value !== action.value)
            : []
        }
      } else {
        return state
      }
    case 'set':
      return {
        ...state,
        [action.key]: action.value ? [action.value] : []
      }
  }
}

const useOSParams = (paramState: ParamsState) => {
  const params = new URLSearchParams()
  Object.entries(paramState).forEach(([key, values]) => {
    values.forEach((value) => {
      params.append(key, value)
    })
  })
  const search = params.toString()
  const query = search ? `?${search}` : ''

  return useSWRFetcher<OSParams>(`/api/os/params${query}`)
}

const useOSList = (paramState: ParamsState) => {
  const params = new URLSearchParams()
  Object.entries(paramState).forEach(([key, values]) => {
    values.forEach((value) => {
      params.append(key, value)
    })
  })
  const search = params.toString()
  const query = search ? `?${search}` : ''

  return useSWRFetcher<OS[]>(`/api/os${query}`)
}

export default function Page() {
  const { isMobile, toggleSidebar } = useSidebar()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [paramState, paramDispatch] = useReducer(
    paramReducer,
    Object.fromEntries(
      Array.from(searchParams.entries()).reduce<[string, string[]][]>(
        (acc, [key, value]) => {
          const entry = acc.find(([k]) => k === key)
          if (entry) {
            entry[1].push(value)
          } else {
            acc.push([key, [value]])
          }
          return acc
        },
        []
      )
    )
  )
  const {
    data: osParams,
    error: osParamsError,
    isLoading: osParamsLoading
  } = useOSParams(paramState)
  const {
    data: osList,
    error: osListError,
    isLoading: osListLoading
  } = useOSList(paramState)
  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      paramDispatch({ type: 'set', key: 'search', value })
    } else {
      paramDispatch({ type: 'remove', key: 'search' })
    }
  }, 300)

  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(paramState).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value)
      })
    })
    const search = params.toString()
    const query = search ? `?${search}` : ''
    const url = `${pathname}${query}`
    history.pushState({}, '', url)
  }, [paramState, pathname])

  return (
    <>
      <Sidebar collapsible='none'>
        <SidebarContent className='gap-0 min-h-svh'>
          {osParams ? (
            Object.entries(osParams).map(([key, values]) => (
              <Collapsible defaultOpen className='group/collapsible' key={key}>
                <SidebarGroup>
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className='cursor-pointer'>
                      {OSParamsText[key as keyof typeof OSParamsText]}
                      <Plus className='ml-auto group-data-[state=open]/collapsible:hidden' />
                      <Minus className='ml-auto group-data-[state=closed]/collapsible:hidden' />
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <Command>
                        <CommandInput
                          placeholder={`Search ${
                            OSParamsText[key as keyof typeof OSParamsText]
                          }`}
                        />
                        <CommandList>
                          <CommandEmpty>
                            No such{' '}
                            {OSParamsText[key as keyof typeof OSParamsText]}{' '}
                            found.
                          </CommandEmpty>
                          <CommandGroup>
                            {Object.entries(values).map(([paramKey, value]) => (
                              <CommandItem
                                key={paramKey}
                                value={paramKey}
                                onSelect={(value) => {
                                  if (paramState[key]?.includes(value)) {
                                    paramDispatch({
                                      type: 'remove',
                                      key,
                                      value: paramKey
                                    })
                                  } else {
                                    paramDispatch({
                                      type: 'add',
                                      key,
                                      value: paramKey
                                    })
                                  }
                                }}
                              >
                                {value}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    paramState[key]?.includes(paramKey)
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))
          ) : osParamsError ? (
            <div>{osParamsError.message}</div>
          ) : osParamsLoading ? (
            <LoaderCircle className='w-4 h-4 animate-spin p-4' />
          ) : (
            <div>No data</div>
          )}
        </SidebarContent>
      </Sidebar>
      <main className='flex flex-1 flex-col gap-4 px-4 w-full'>
        <div className='flex flex-row gap-4 w-full items-center'>
          {isMobile && (
            <Button
              data-sidebar='trigger'
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={toggleSidebar}
            >
              <PanelLeft />
              <span className='sr-only'>Toggle Sidebar</span>
            </Button>
          )}
          <Input
            placeholder='Search'
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
            className='w-full'
          />
        </div>
        {osList ? (
          <DataTable columns={OSListColumns} data={osList} />
        ) : osListError ? (
          <div>{osListError.message}</div>
        ) : osListLoading ? (
          <LoaderCircle className='w-4 h-4 animate-spin p-4' />
        ) : (
          <div>No data</div>
        )}
      </main>
    </>
  )
}
