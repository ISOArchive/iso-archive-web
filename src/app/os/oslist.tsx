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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { OSParamsText, type OSParams } from '@/types/os'
import { Check, Minus, PanelLeft, Plus } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { use, useEffect, useReducer } from 'react'

type ParamsState = Record<string, string[]>

const paramReducer = (
  state: ParamsState,
  action: {
    type: 'add' | 'remove'
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
  }
}

export const OSList = ({
  osParamsPromise
}: {
  osParamsPromise: Promise<OSParams>
}) => {
  const osParams = use(osParamsPromise)
  const { isMobile, toggleSidebar } = useSidebar()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

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

  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(paramState).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value)
      })
    })
    const search = params.toString()
    const query = search ? `?${search}` : ''
    router.replace(`${pathname}${query}`)
  }, [paramState, pathname, router])

  return (
    <>
      <Sidebar collapsible='none'>
        <SidebarContent className='gap-0'>
          {Object.entries(osParams).map(([key, values]) => (
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
          ))}
        </SidebarContent>
      </Sidebar>
      <main className='flex flex-1 flex-row gap-4'>
        <div className='flex flex-col gap-4'>
          {isMobile && (
            <Button
              data-sidebar='trigger'
              variant='ghost'
              size='icon'
              className='h-7 w-7'
              onClick={toggleSidebar}
            >
              <PanelLeft />
              <span className='sr-only'>Toggle Sidebar</span>
            </Button>
          )}
        </div>
      </main>
    </>
  )
}
