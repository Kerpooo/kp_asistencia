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

export interface AlumnosCurso {
    listaInscritos: ListaAlumnosCurso
}

export function CardInscritos({ listaInscritos }: AlumnosCurso) {

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="text-4xl">Alumnos</CardTitle>

                    <AddEstudiante listaInscritos={listaInscritos} />

                </CardHeader>
                <CardContent className="flex flex-col gap-4 max-h-[390px] min-h-[390px] overflow-y-auto">
                    {
                        listaInscritos.map((estudiante) => {
                            return (
                                <div className="flex items-center gap-4 min-w-52" key={estudiante.id}>
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarFallback>{`${estudiante.nombre[0]} ${estudiante.apellido[0]}`}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium leading-none">{`${estudiante.nombre} ${estudiante.apellido}`} </p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </CardContent>
            </Card>
        </>
    )
}




