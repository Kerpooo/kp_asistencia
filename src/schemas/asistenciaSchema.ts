import { z } from "zod"

export const formSchema = z.object({
    // asistencia
    kids: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    fecha: z.date(),
    hora_toma: z.date(),

})

