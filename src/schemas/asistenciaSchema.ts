import { z } from "zod"

export const formSchema = z.object({
    // asistencia
    kids: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "Selecciona al menos una casilla",
    }),
    fecha: z.date(),
    asistio: z.boolean(),
    hora_toma: z.date(),
    tomada_por: z.string().optional(),
    cursoId: z.string()

})

