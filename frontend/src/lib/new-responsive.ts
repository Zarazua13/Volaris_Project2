import { z } from "zod";

export const responsivesSettingsFormSchema = z.object({
  device: z.number({
    required_error: "Este campo es obligatorio",
  }),
  brand: z.string({
    required_error: "Este campo es obligatorio",
  }),
  serialNumber: z.string({
    required_error: "Este campo es obligatorio",
  }),
  model: z.string({
    required_error: "Este campo es obligatorio",
  }),
  description: z.string({
    required_error: "Este campo es obligatorio",
  }),
});

export type ResponsivesSettingsFormValues = z.infer<
  typeof responsivesSettingsFormSchema
>;

export const defaultValues: Partial<ResponsivesSettingsFormValues> = {
  device: 0,
  brand: "",
  serialNumber: "",
  model: "",
  description: "",
};
