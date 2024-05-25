import CursosCard from "@/components/cursos/CursosCard"
import { listarCursos } from "@/server/actions/curso"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EditForm } from "@/components/cursos/EditForm"


export default async function CursosPage() {



    const listaCursos = await listarCursos()
    return (
        <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">

                {
                    listaCursos.map(({ activo, dia_semana, hora_fin, hora_inicio, id, nombre, Kid }) => {
                        return (
                            <Dialog key={id}>
                                <DialogTrigger className="hover:cursor-pointer" asChild>
                                    <CursosCard
                                        key={id}
                                        activo={activo}
                                        dia_semana={dia_semana}
                                        hora_fin={hora_fin}
                                        hora_inicio={hora_inicio}
                                        id={id}
                                        nombre={nombre}
                                        inscritos={Kid.length}

                                    />

                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Editar Curso</DialogTitle>
                                        <DialogDescription>
                                            Haz cambios a tus cursos aquí.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <EditForm
                                        key={id}
                                        activo={activo}
                                        dia_semana={dia_semana}
                                        hora_fin={hora_fin}
                                        hora_inicio={hora_inicio}
                                        id={id}
                                        nombre={nombre}
                                    />
                                </DialogContent>

                            </Dialog>


                        )
                    }


                    )
                }
            </div>
        </main>
    )
}