"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { listarCursos } from "@/server/actions/curso";
import { Prisma } from "@prisma/client";

const DIAS = [
    'DOMINGO',
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO'
]

export type Cursos = Prisma.PromiseReturnType<typeof listarCursos>
interface SelectCursoProps {
    cursos: Cursos | undefined
    fecha: Date
}

export const SelectCurso = ({ cursos, fecha }: SelectCursoProps) => {
    // Selecciona los cursos que se den ese dia especifico
    if (cursos) {
        const cursosDia = cursos.filter((curso) => curso.dia_semana === DIAS[fecha.getDay()])

        return (
            <Select>
                <SelectTrigger>
                    {(cursosDia.length > 0) ? <SelectValue placeholder="Cursos" /> : <SelectValue placeholder="..." />}
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {(cursosDia.length > 0) ? <SelectLabel>Cursos</SelectLabel> : <SelectLabel>No hay cursos este dia</SelectLabel>}
                        {cursosDia && cursosDia.map(({ id, nombre }) => <SelectItem key={id} value={id}>{nombre}</SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>
        )
    }

    return (
        <Select disabled>
            <SelectTrigger>
                <SelectValue placeholder="Cursos..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cursos</SelectLabel>
                </SelectGroup>
            </SelectContent>
        </Select>
    )

}
