import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components'
import * as z from "zod"
import { Plus } from "lucide-react"
import { useForm } from 'react-hook-form'

import { zodResolver } from "@hookform/resolvers/zod";
import { createDeviceFormSchema } from '@/lib/devices';

interface Props {
  onSubmit: (values: z.infer<typeof createDeviceFormSchema>) => void
}

export function DialogNewDevice({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof createDeviceFormSchema>>({
    resolver: zodResolver(createDeviceFormSchema),
    defaultValues: {
      name: '',
      code: ''
    }
  })

  return (
    <Dialog onOpenChange={(isOpen: boolean) => {
      if (!isOpen) form.reset()
    }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          Nuevo dispositivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nuevo dispositivo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Laptop' {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre del dispositivo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /><FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abreciación</FormLabel>
                  <FormControl>
                    <Input placeholder='LAP' {...field} />
                  </FormControl>
                  <FormDescription>
                    Abreviación del dispositivo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="default" onClick={form.handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}