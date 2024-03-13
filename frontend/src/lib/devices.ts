import * as z from "zod"

export const createDeviceFormSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  code: z.string().max(3, {
    message: "Name must be at least 5 characters.",
  }),
})