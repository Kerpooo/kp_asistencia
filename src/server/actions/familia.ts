"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function crearFamilia(path: string,
    formData: {
        encargadoNombre: string, encargadoApellido: string, encargadoEmail: string, encargadoTelefono: string,
        kidNombre: string, kidApellido: string, anoNacimiento: Date
    }) {
    try {
        const familia = await prisma.encargado.create({
            data: {
                nombre: formData.encargadoNombre,
                apellido: formData.encargadoApellido,
                email: formData.encargadoEmail,
                telefono: formData.encargadoTelefono,
                Kid: {
                    create: [
                        {
                            nombre: formData.kidNombre,
                            apellido: formData.kidApellido,
                            ano_nacimiento: formData.anoNacimiento
                        }
                    ]
                }
            }
        })
        revalidatePath(path, "page")

        return familia

    } catch (error) {

        console.error("Error al crear el encargado:", error);
        throw error;

    }

}