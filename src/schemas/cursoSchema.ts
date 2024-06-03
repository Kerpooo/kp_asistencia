import { z } from "zod"


export const formSchema = z.object({
    // curso
    nombre: z.string(),
    hora_inicio: z.string(),
    hora_fin: z.string(),
    dias_semana: z
        .array(z.string().min(1))
        .min(1)
        .nonempty("Seleccione al menos un dia."),
    activo: z.boolean().optional()
})