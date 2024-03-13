import { useState } from "react"

import { Check, ChevronsUpDown } from "lucide-react"
import { useSelector } from "react-redux"

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components"

import { cn } from "@/lib/utils"

import { RootState } from "@/store"

interface Props {
  setSelectedLocation: (id: string) => void,
  selectedLocation: string,
}

export const LocationDropdown = ({ setSelectedLocation, selectedLocation }: Props) => {
  const getLocationsState = useSelector((state: RootState) => state.locations.getLocations)
  const [open, setOpen] = useState(false)

  const locations = getLocationsState.data.map(location => ({ label: location.name, value: `${location.id}` }))

  return (
    <div className="space-y-2 flex flex-col"> 
      <Label>Ubicación</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[400px] justify-between"
          >
            {selectedLocation
              ? locations.find(location => location.value === selectedLocation)?.label
              : "Selecciona una ubicación..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Buscar ubicación..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="max-h-[400px] overflow-auto" >
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setSelectedLocation(currentValue === selectedLocation ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground">Selecciona la ubicación de la responsiva</p>
    </div>
  )
}
