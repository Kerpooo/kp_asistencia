import { z } from "zod"

export const formSchema = z.object({
    // encargadoShema
    encargadoNombre: z.string({ required_error: "Nombre es obligatorio" }).min(2).max(10),
    encargadoApellido: z.string({ required_error: "Apellido es obligatorio" }).min(2).max(10),
    encargadoEmail: z.string({ required_error: "Correo es obligatorio" }).min(2).max(30).email("Este no es un correo valido"),
    encargadoTelefono: z.string().min(2).max(50),


    // kidSchema
    kidNombre: z.string({ required_error: "Nombre es obligatorio" }).min(2).max(10),
    kidApellido: z.string({ required_error: "Nombre es obligatorio" }).min(2).max(10),
    anoNacimiento: z.date({ required_error: "Fecha de nacimiento obligatoria" }),
})