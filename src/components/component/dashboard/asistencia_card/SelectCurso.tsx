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

type Cursos = Prisma.PromiseReturnType<typeof listarCursos>
interface SelectCursoProps {
    cursos: Cursos
    fecha: Date
}

export const SelectCurso = ({ cursos, fecha }: SelectCursoProps) => {
    // Selecciona los cursos que se den ese dia especifico
    const cursosDia = cursos.filter((curso) => curso.dia_semana === DIAS[fecha.getDay()])

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Cursos" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cursos</SelectLabel>
                    {cursosDia.map(({ id, nombre }) => <SelectItem key={id} value={id}>{nombre}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )

}
