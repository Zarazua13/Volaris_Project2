import { useEffect } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  EmployeeDetails,
  EmployeeDetailsLoading,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";

import { RootState, getDefaultAssignerThunk } from "@/store";

const searchEmployeeFormSchema = z.object({
  employeeNumber: z.string({
    required_error: "Este campo es obligatorio",
    invalid_type_error: "Este campo debe ser un número",
  }),
});

type SearchEmployeeFormValues = z.infer<typeof searchEmployeeFormSchema>;

const defaultValues: Partial<SearchEmployeeFormValues> = {
  employeeNumber: "",
};

export const SearchDefaultAssigner = () => {
  const dispatch = useDispatch();
  const {
    getSettings: getSettingsState,
    getDefaultAssigner: getDefaultAssigner,
  } = useSelector((state: RootState) => state.settings);
  const form = useForm<SearchEmployeeFormValues>({
    resolver: zodResolver(searchEmployeeFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (getSettingsState.success) {
      form.reset({
        employeeNumber: getSettingsState.data.defaultAssigner,
      });
      dispatch(getDefaultAssignerThunk(getSettingsState.data.defaultAssigner));
    }
  }, [getSettingsState]);

  function onSubmit(data: SearchEmployeeFormValues) {
    dispatch(getDefaultAssignerThunk(data.employeeNumber));
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap items-center space-x-2"
        >
          <div className="flex-1">
            <FormField
              control={form.control}
              name="employeeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entrega por defecto</FormLabel>
                  <FormControl>
                    <Input placeholder="V0000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Número de empleado de quien entrega
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button>Buscar</Button>
        </form>
      </Form>
      <div className="flex">
        {getDefaultAssigner.loading && <EmployeeDetailsLoading />}
        {getDefaultAssigner.success && (
          <EmployeeDetails employee={getDefaultAssigner.data} />
        )}
      </div>
    </div>
  );
};
