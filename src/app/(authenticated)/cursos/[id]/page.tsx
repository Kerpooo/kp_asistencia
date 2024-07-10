import { CardInscritos } from "@/components/cursos/CardEstudiantes"
import { EditForm } from "@/components/cursos/EditForm"
import { obtenerCurso } from "@/server/actions/curso"
import { obtenerEstudiantesCurso } from "@/server/actions/kid"

export default async function CursosPage({ params }: {
    params: {
        id: string
    }
}) {

    const { id } = params
    const curso = await obtenerCurso(id)
    const estudiantes = await obtenerEstudiantesCurso(id)

    return (
        <main className="container p-4 md:p-10 ">
            <div className="grid grid-cols-3 gap-4">

                <section className="col-span-2">
                    {curso && <EditForm {...curso} />}

                </section>

                <section className="col-span-1">
                    <CardInscritos listaInscritos={estudiantes} />

                </section>
            </div>
        </main>
    )
}