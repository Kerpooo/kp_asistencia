import { listarEstudiantes } from "@/server/actions/kid"
import { type ListaAlumnos } from "@/types/prisma_types"
import { useEffect, useState } from "react"

export function useEstudiantes() {
    const [estudiantes, setEstudiantes] = useState<ListaAlumnos>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
        const obtenerEstudiantes = async () => {
            try {
                const resultado = await listarEstudiantes()
                setEstudiantes(resultado)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err)
                } else {
                    setError(new Error("Error al obtener los datos de los estudiantes"))
                }
            } finally {
                setLoading(false)
            }
        }

        void obtenerEstudiantes()
    }, [])

    return { estudiantes, loading, error }
}



