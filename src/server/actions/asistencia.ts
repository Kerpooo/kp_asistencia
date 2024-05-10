"use server"

import { AsistenciaForm } from "@/components/dashboard/asistencia_card/FormAsistencia"
import { prisma } from "@/lib/prisma"
import { getUserSessionServer } from "./user"

export async function tomaAsistencia(formData: AsistenciaForm) {
    const userId = await getUserSessionServer()



    //TODO: COLOCAR RESTRICCION DE CUANTAS VECES SE PUEDE TOMAR LA ASISTENCIA
    const kidsListAsistencia = [...formData.kids]


    const listaAsistencia = kidsListAsistencia.map((kid) => {


        const asistenciaData = {
            kidId: kid,
            cursoId: formData.cursoId,
            fecha: formData.fecha,
            asistio: formData.asistio,
            hora_toma: formData.hora_toma,
            tomada_por: userId?.email
        }

        return asistenciaData
    })

    try {
        const asistencia = await prisma.asistencia.createMany({
            data: listaAsistencia

        })

        return asistencia

    } catch (error) {

        console.error("Error al tomar la asistencia:", error);
        throw error;

    }
}