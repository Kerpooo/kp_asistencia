import { z } from "zod"


export const formSchema = z.object({
    // asistencia
    kids: z.array(
        z.object({
            kidId: z.string(),
            asistio: z.boolean()
        })
    ).refine((kids) => kids.some(kid => kid.asistio), {
        message: "Al menos un alumno debe marcar asistencia."
    }),
    fecha: z.date(),
    hora_toma: z.date(),
    tomada_por: z.string().optional(),
    cursoId: z.string().min(1, { message: "Seleccione un curso" })
})