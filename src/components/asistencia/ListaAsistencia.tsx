import { listarAsistenciaCursoFecha } from "@/server/actions/asistencia"
import { useEffect, useState } from "react"
import { type ListaAsistenciaType } from "@/types/prisma_types"
import { TablaAsistencia } from "./TablaAsistencia"

interface ListaAsistenciaProps {
    fecha: Date | undefined
    cursoId: string | undefined

}



export const ListaAsistencia = ({ cursoId, fecha }: ListaAsistenciaProps) => {

    const [listaAsistencia, setListaAsistencia] = useState<ListaAsistenciaType>()

    useEffect(() => {
        const obtenerListaAsistencia = async () => {
            const listaAsistencia = await listarAsistenciaCursoFecha(cursoId, fecha)
            setListaAsistencia(listaAsistencia)
        }

        obtenerListaAsistencia().catch((e => `Error al obtener la lista de asistencia ${e}`))
    }, [fecha, cursoId])

    if (listaAsistencia && listaAsistencia?.length > 0) {
        return <TablaAsistencia data={listaAsistencia} />

    }

    return <h1 className="text-center">No se ha tomado asistencia de este curso en la fecha seleccionada</h1>

}


