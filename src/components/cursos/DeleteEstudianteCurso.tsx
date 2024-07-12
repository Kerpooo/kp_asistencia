"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { quitarEstudianteCurso } from "@/server/actions/curso"

interface EstudianteCurso {
    cursoId: string,
    estudianteId: string
}

export const DeleteEstudianteCurso = ({ cursoId, estudianteId }: EstudianteCurso) => {
    return (
        <Button size={"icon"} onClick={() => quitarEstudianteCurso(estudianteId, cursoId)}>
            <Trash2Icon />
        </Button>)
}
