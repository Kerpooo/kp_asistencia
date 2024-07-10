import CursosCard from "@/components/cursos/CursosCard"
import { listarCursos } from "@/server/actions/curso"
import { AddDialog } from "@/components/cursos/AddDialog"

export default async function CursosPage() {
    const listaCursos = await listarCursos()
    return (
        <main className="container flex  flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="ml-auto flex items-center gap-2">
                <AddDialog />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                {
                    listaCursos.map((curso) =>
                        <CursosCard key={curso.id} {...curso} />
                    )
                }
            </div>
        </main>
    )
}