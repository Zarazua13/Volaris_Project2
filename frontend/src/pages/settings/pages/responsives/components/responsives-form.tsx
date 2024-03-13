import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { RootState, postSettingsThunk } from "@/store";
import { toast } from "sonner";

import { SearchDefaultAssigner } from ".";

const responsivesSettingsFormSchema = z.object({
  referenceNumber: z.coerce
    .number({
      required_error: "Este campo es obligatorio",
      invalid_type_error: "Este campo debe ser un número",
    })
    .gte(1, { message: "El número de referencia debe ser al menos 1" }),
  defaultComment: z.string({
    required_error: "Este campo es obligatorio",
    invalid_type_error: "Este campo debe ser un número",
  }),
});

type ResponsivesSettingsFormValues = z.infer<
  typeof responsivesSettingsFormSchema
>;

const defaultValues: Partial<ResponsivesSettingsFormValues> = {
  referenceNumber: 1,
  defaultComment: "",
};

export const ResponsivesForm = () => {
  const dispatch = useDispatch();
  const {
    getSettings: getSettingsState,
    getDefaultAssigner: getDefaultAssignerState,
    postSettings: postSettingsState,
  } = useSelector((state: RootState) => state.settings);
  const form = useForm<ResponsivesSettingsFormValues>({
    resolver: zodResolver(responsivesSettingsFormSchema),
    defaultValues,
  });

  const disableButton =
    !form.formState.isValid ||
    getSettingsState.loading ||
    postSettingsState.loading ||
    !getDefaultAssignerState.success;

  useEffect(() => {
    if (getSettingsState.success) {
      form.reset({
        referenceNumber: Number(getSettingsState.data.referenceNumber),
        defaultComment: getSettingsState.data.defaultComment,
      });
    }
    if (getSettingsState.error) toast.error("No se pudieron obtener los datos");
  }, [getSettingsState, form]);

  function onSubmit(data: ResponsivesSettingsFormValues) {
    dispatch(
      postSettingsThunk({
        ...data,
        defaultAssigner: getDefaultAssignerState.data.employeeNumber,
      }),
    );
  }

  return (
    <>
      <SearchDefaultAssigner />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <FormField
            control={form.control}
            name="referenceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de referencia inicial</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Número de referencia"
                    autoComplete="off"
                    {...field}
                    disabled={
                      getSettingsState.loading ||
                      postSettingsState.loading ||
                      getSettingsState.error
                    }
                  />
                </FormControl>
                <FormDescription>
                  Establece el número de referencia con el que iniciarán las
                  siguientes responsivas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Característica del equipo por defecto</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    autoComplete="off"
                    {...field}
                    disabled={
                      getSettingsState.loading ||
                      postSettingsState.loading ||
                      getSettingsState.error
                    }
                  />
                </FormControl>
                <FormDescription>
                  Establece la característica que tendrá el equipo por defecto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={disableButton} type="submit">
            {postSettingsState.loading ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </Form>
    </>
  );
};
