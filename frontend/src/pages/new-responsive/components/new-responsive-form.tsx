import { useEffect, useState } from "react";

import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";

import {
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";

import { RootState, postResponsiveThunk } from "@/store";

import { cn } from "@/lib/utils";

import {
  LocationDropdown,
  SearchReceiver,
  SearchAssigner,
  SearchApprover,
} from "./";
import {
  ResponsivesSettingsFormValues,
  responsivesSettingsFormSchema,
  defaultValues,
} from "@/lib/new-responsive";

export const NewResponsiveForm = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showSearchApprover, setShowSearchApprover] = useState(false);
  const getDevicesState = useSelector(
    (state: RootState) => state.devices.getDevices,
  );
  const getSettingsState = useSelector(
    (state: RootState) => state.settings.getSettings,
  );
  const dispatch = useDispatch();
  const { getAssigner, getReceiver, postResponsive } = useSelector(
    (state: RootState) => state.newResponsives,
  );
  const form = useForm<ResponsivesSettingsFormValues>({
    resolver: zodResolver(responsivesSettingsFormSchema),
    defaultValues,
  });
  const devices = getDevicesState.data.map((device) => ({
    label: device.name,
    value: device.id,
  }));

  const disableSave = postResponsive.loading;

  const toggleApprover = (value: boolean) => {
    setShowSearchApprover(value);
  };

  useEffect(() => {
    if (getSettingsState.success) {
      form.reset({
        description: getSettingsState.data.defaultComment,
      });
    }
  }, [getSettingsState, form]);

  const onSubmit = (data: ResponsivesSettingsFormValues) => {
    const body = {
      location_id: selectedLocation,
      receiver_employee_number: getReceiver.data.employeeNumber,
      assigner_employee_number: getAssigner.data.employeeNumber,
      device_id: data.device,
      serial_number: data.serialNumber,
      ...data,
    };
    dispatch(postResponsiveThunk(body));
  };

  return (
    <div className="space-y-9">
      <LocationDropdown
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
      />

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" onCheckedChange={toggleApprover} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Becario
        </label>
      </div>

      {showSearchApprover && <SearchApprover />}

      <SearchReceiver />

      <SearchAssigner />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <FormField
            control={form.control}
            name="device"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Equipo</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[400px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? devices.find(
                              (device) => device.value === field.value,
                            )?.label
                          : "Seleccione un equipo"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search device..." />
                      <CommandEmpty>No device found.</CommandEmpty>
                      <CommandGroup>
                        {devices.map((device) => (
                          <CommandItem
                            value={device.label}
                            key={device.value}
                            onSelect={() => {
                              form.setValue("device", device.value);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                device.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {device.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Esta será la ubicación de la responsiva
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Lenovo" {...field} />
                </FormControl>
                <FormDescription>Escribe la marca del equipo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de serie</FormLabel>
                <FormControl>
                  <Input placeholder="4A185048W" {...field} />
                </FormControl>
                <FormDescription>
                  Escribe el número de serie del equipo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="ZBook" {...field} />
                </FormControl>
                <FormDescription>Escribe el modelo del equipo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Características del equipo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Equipo de computo para trabajo"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Escribe una desripción y/o características del equipo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={disableSave} type="submit">
            {postResponsive.loading ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
