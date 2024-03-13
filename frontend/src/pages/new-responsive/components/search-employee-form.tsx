import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  Input 
} from '@/components'

import { AnyAction } from '@reduxjs/toolkit'

const searchEmployeeFormSchema = z.object({
  employeeNumber: z.string({
    required_error: 'Este campo es obligatorio',
    invalid_type_error: 'Este campo debe ser un número',
  }),
})

type SearchEmployeeFormValues = z.infer<typeof searchEmployeeFormSchema>

const defaultValues: Partial<SearchEmployeeFormValues> = {
  employeeNumber: '',
}

interface Props {
  thunk: (employeeNumber: string) => AnyAction,
  label: string,
  description: string,
}

export const SearchEmployeeForm = ({ thunk, label, description }: Props) => {
  const dispatch = useDispatch()
  const form = useForm<SearchEmployeeFormValues>({
    resolver: zodResolver(searchEmployeeFormSchema),
    defaultValues,
  })

  function onSubmit(data: SearchEmployeeFormValues) {
    dispatch(thunk(data.employeeNumber))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-center space-x-2">
        <div className='flex-1'>
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input placeholder="V0000" {...field} />
                </FormControl>
                <FormDescription>
                  {description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button>Buscar</Button>
      </form>
    </Form>
  )
}
