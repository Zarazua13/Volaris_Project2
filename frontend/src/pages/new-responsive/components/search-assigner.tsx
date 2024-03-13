import { useEffect } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
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

import { RootState, getAssignerThunk } from "@/store";

import { EmployeeDetails } from ".";

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

export const SearchAssigner = () => {
  const dispatch = useDispatch();
  const getSettingsState = useSelector(
    (state: RootState) => state.settings.getSettings,
  );
  const form = useForm<SearchEmployeeFormValues>({
    resolver: zodResolver(searchEmployeeFormSchema),
    defaultValues,
  });
  const getAssignerState = useSelector(
    (state: RootState) => state.newResponsives.getAssigner,
  );

  useEffect(() => {
    if (getSettingsState.success) {
      form.reset({
        employeeNumber: getSettingsState.data.defaultAssigner,
      });
      dispatch(getAssignerThunk(getSettingsState.data.defaultAssigner));
    }
  }, [getSettingsState]);

  function onSubmit(data: SearchEmployeeFormValues) {
    dispatch(getAssignerThunk(data.employeeNumber));
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
                  <FormLabel>Entrega</FormLabel>
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
      {getAssignerState.loading && <EmployeeDetailsLoading />}
      {getAssignerState.success && (
        <EmployeeDetails employee={getAssignerState.data} />
      )}
    </div>
  );
};
