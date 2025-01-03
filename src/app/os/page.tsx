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
import { Suspense, useEffect, useMemo, useReducer, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { OSListColumns } from './columns'
import type { PaginationState, SortingState } from '@tanstack/react-table'

interface ParamsState {
  variants?: string[]
  names?: string[]
  versions?: string[]
  disketteSizes?: string[]
  floppySizes?: string[]
  archs?: string[]
  tags?: string[]
  search?: string[]
  ascBy?: string[]
  descBy?: string[]
  page?: string[]
  size?: string[]
}

const paramReducer = (
  state: ParamsState,
  action: {
    type: 'add' | 'remove' | 'set' | 'sorting' | 'pagination'
    key?: keyof ParamsState
    value?: string
    sorting?: SortingState
    pagination?: PaginationState
  }
): ParamsState => {
  switch (action.type) {
    case 'add':
      console.log(action)
      if (action.key) {
        if (state[action.key]) {
          return {
            ...state,
            [action.key]: [...state[action.key]!, action.value!]
          }
        } else {
          return {
            ...state,
            [action.key]: [action.value!]
          }
        }
      }
    case 'remove':
      if (action.key) {
        if (state[action.key]) {
          return {
            ...state,
            [action.key]: action.value
              ? state[action.key]!.filter((value) => value !== action.value)
              : []
          }
        } else {
          return state
        }
      }
    case 'set':
      if (action.key) {
        return {
          ...state,
          [action.key]: action.value ? [action.value] : []
        }
      }
    case 'sorting':
      const newState = { ...state }
      if (action.sorting && action.sorting[0]) {
        if (action.sorting[0].desc) {
          newState.descBy = [action.sorting[0].id]
          newState.ascBy = []
        } else {
          newState.ascBy = [action.sorting[0].id]
          newState.descBy = []
        }
      }
      return newState
    case 'pagination':
      return {
        ...state,
        page: action.pagination?.pageIndex
          ? [action.pagination.pageIndex.toString()]
          : [],
        size: action.pagination?.pageSize
          ? [action.pagination.pageSize.toString()]
          : []
      }
  }
}

const constructQuery = (paramState: ParamsState) => {
  const params = new URLSearchParams()
  Object.entries(paramState).forEach(
    ([key, values]: [string, string[] | undefined]) => {
      values?.forEach((value) => {
        params.append(key, value)
      })
    }
  )
  const search = params.toString()
  return search ? `?${search}` : ''
}

const useOSParams = ({
  variants,
  names,
  versions,
  disketteSizes,
  floppySizes,
  archs,
  tags,
  search
}: ParamsState) => {
  const paramStateMemo = useMemo(
    () => ({
      variants,
      names,
      versions,
      disketteSizes,
      floppySizes,
      archs,
      tags,
      search
    }),
    [archs, disketteSizes, floppySizes, names, search, tags, variants, versions]
  )

  return useSWRFetcher<OSParams>(
    `${process.env.NEXT_PUBLIC_API_URL ?? '/api'}/os/params${constructQuery(
      paramStateMemo
    )}`
  )
}

const useOSList = (paramState: ParamsState) => {
  const paramStateMemo = useMemo(() => paramState, [paramState])

  return useSWRFetcher<OS[]>(
    `${process.env.NEXT_PUBLIC_API_URL ?? '/api'}/os${constructQuery(
      paramStateMemo
    )}`
  )
}

const useOSCount = ({
  variants,
  names,
  versions,
  disketteSizes,
  floppySizes,
  archs,
  tags
}: ParamsState) => {
  const paramStateMemo = useMemo(
    () => ({
      variants,
      names,
      versions,
      disketteSizes,
      floppySizes,
      archs,
      tags
    }),
    [archs, disketteSizes, floppySizes, names, tags, variants, versions]
  )

  return useSWRFetcher<number>(
    `${process.env.NEXT_PUBLIC_API_URL ?? '/api'}/os/count${constructQuery(
      paramStateMemo
    )}`
  )
}

const OSList = () => {
  const { isMobile, toggleSidebar } = useSidebar()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [sorting, setSorting] = useState<SortingState>(() => {
    if (searchParams.has('ascBy')) {
      return [{ id: searchParams.get('ascBy')!, desc: false }]
    } else if (searchParams.has('descBy')) {
      return [{ id: searchParams.get('descBy')!, desc: true }]
    }
    return []
  })
  const [pagination, setPagination] = useState<PaginationState>(() => {
    const state: PaginationState = {
      pageIndex: 0,
      pageSize: 10
    }
    if (searchParams.has('page')) {
      state.pageIndex = parseInt(searchParams.get('page')!)
    }
    if (searchParams.has('size')) {
      state.pageSize = parseInt(searchParams.get('size')!)
    }
    return state
  })
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
  const { data: osCount } = useOSCount(paramState)
  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      paramDispatch({ type: 'set', key: 'search', value })
    } else {
      paramDispatch({ type: 'remove', key: 'search' })
    }
  }, 300)

  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(paramState).forEach(
      ([key, values]: [string, string[] | undefined]) => {
        values?.forEach((value) => {
          params.append(key, value)
        })
      }
    )
    const search = params.toString()
    const query = search ? `?${search}` : ''
    const url = `${pathname}${query}`
    history.pushState({}, '', url)
  }, [paramState, pathname])

  useEffect(() => {
    if (sorting.length) {
      paramDispatch({ type: 'sorting', sorting })
    }
  }, [sorting])

  useEffect(() => {
    if (pagination.pageIndex || pagination.pageSize) {
      paramDispatch({ type: 'pagination', pagination })
    }
  }, [pagination])

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
                            {values.map((value) => (
                              <CommandItem
                                key={value}
                                value={value}
                                onSelect={(value) => {
                                  if (
                                    paramState[
                                      key as keyof ParamsState
                                    ]?.includes(value)
                                  ) {
                                    paramDispatch({
                                      type: 'remove',
                                      key: key as keyof ParamsState,
                                      value: value
                                    })
                                  } else {
                                    paramDispatch({
                                      type: 'add',
                                      key: key as keyof ParamsState,
                                      value: value
                                    })
                                  }
                                }}
                              >
                                {value}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    paramState[
                                      key as keyof ParamsState
                                    ]?.includes(value)
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
          <DataTable
            columns={OSListColumns}
            data={osList}
            onSortingChange={setSorting}
            onPaginationChange={setPagination}
            sorting={sorting}
            pagination={pagination}
            rowCount={osCount}
          />
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

export default function Page() {
  return (
    <Suspense>
      <OSList />
    </Suspense>
  )
}
