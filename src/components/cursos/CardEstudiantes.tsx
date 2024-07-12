import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { type ListaAlumnosCurso } from "@/types/prisma_types"
import { AddEstudiante } from "./AddEstudiante"
import { DeleteEstudianteCurso } from "./DeleteEstudianteCurso"

export interface AlumnosCurso {
    listaInscritos: ListaAlumnosCurso
    cursoId?: string
}


export function CardInscritos({ listaInscritos, cursoId }: AlumnosCurso) {

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="text-4xl">Alumnos</CardTitle>

                    <AddEstudiante listaInscritos={listaInscritos} />

                </CardHeader>
                <CardContent className="flex flex-col gap-4 max-h-[390px] min-h-[390px] overflow-y-auto">
                    {
                        listaInscritos.map(({ id, nombre, apellido }) => {
                            if (cursoId) {
                                return (
                                    <div className="flex items-center justify-between" key={id}>
                                        <div className="flex items-center gap-4 min-w-52">
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                                <AvatarFallback>{`${nombre[0]} ${apellido[0]}`}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium leading-none">{`${nombre} ${apellido}`}</p>
                                            </div>
                                        </div>

                                        <DeleteEstudianteCurso
                                            cursoId={cursoId}
                                            estudianteId={id}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                </CardContent>
            </Card>
        </>
    )
}
