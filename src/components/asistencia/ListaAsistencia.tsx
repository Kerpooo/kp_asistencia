import { obtenerAsistenciaAlumnos } from "@/server/actions/asistencia"
import { useEffect, useState } from "react"
import { type AsistenciaType } from "@/types/prisma_types"
import { TablaAsistencia } from "./TablaAsistencia"

interface ListaAsistenciaProps {
    fecha: Date | undefined
    cursoId: string | undefined

}



export const ListaAsistencia = ({ cursoId, fecha }: ListaAsistenciaProps) => {

    const [listaAsistencia, setListaAsistencia] = useState<AsistenciaType>()

    useEffect(() => {
        const obtenerListaAsistencia = async () => {
            if (cursoId && fecha) {
                const listaAsistencia = await obtenerAsistenciaAlumnos(cursoId, fecha)
                setListaAsistencia(listaAsistencia)
            }
        }

        obtenerListaAsistencia().catch((e => `Error al obtener la lista de asistencia ${e}`))
    }, [fecha, cursoId])



    if (listaAsistencia) {

        const { Asistencia_Alumnos: listaAlumnos } = listaAsistencia
        return <TablaAsistencia data={listaAlumnos} />

    }

    return <h1 className="text-center">No se ha tomado asistencia de este curso en la fecha seleccionada</h1>

}


