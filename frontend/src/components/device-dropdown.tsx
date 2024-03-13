import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { 
  Button, 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  Popover, 
  PopoverContent, 
  PopoverTrigger, 
  ScrollArea } from '@/components/ui/'

import { getDevicesThunk } from '@/store/devices'

import { RootState } from '@/store'

interface Props {
 deviceSelected: string,
 setDevice: (deviceSelected: string) => void
}

export function DeviceDropdown ({ deviceSelected, setDevice }:Props) {
  const dispatch = useDispatch()
  const { data } = useSelector((state: RootState) => state.devices.getDevices)
  const [open, setOpen] = useState(false)

  const devices = data ? data.map(({ name, id }) => ({ value: id, label: name })) : []

  useEffect(() => {
    dispatch(getDevicesThunk())
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {deviceSelected
            ? devices.find(device => device.value === deviceSelected)?.label
            : 'Buscar equipo...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Buscar equipo...' className='h-9' />
          <ScrollArea className='h-96'>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {devices.map(l => (
                <CommandItem
                  key={l.value}
                  value={l.value}
                  onSelect={() => {
                    setDevice(deviceSelected === l.value ? '' : l.value)
                    setOpen(false)
                  }}
                >
                  {l.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      deviceSelected === l.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}