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
import { listarCursos } from "@/server/actions/curso"
import { useCursoStore } from "@/store/zustand"
import { type Prisma, DIAS } from "@prisma/client"
import { useEffect, useState } from "react"



export type Cursos = Prisma.PromiseReturnType<typeof listarCursos>
interface SelectCursoProps {
    fecha: Date
}

export const SelectCurso = ({ fecha }: SelectCursoProps) => {
    const { setCursoSeleccionado } = useCursoStore()
    const [cursos, setCursos] = useState<Cursos>()
    const dias = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
    const diaActual = dias[fecha.getDay()]
    useEffect(() => {
        const obtenerCursos = async () => {
            const listaCursos = await listarCursos()
            if (diaActual) {
                const diaEnum = Object.values(DIAS).find(dia => dia === diaActual)
                if (diaEnum) {
                    const cursosDia = listaCursos.filter(({ dia_semana }) => dia_semana.includes(diaEnum))
                    setCursos(cursosDia)
                }
            }
        }
        obtenerCursos().catch((e) => {
            return `Error Obteniendo Cursos ${e}`
        })
    }, [fecha]
    )
    // Selecciona los cursos que se den ese dia especifico

    return (
        <Select onValueChange={(value) => setCursoSeleccionado(value)}>
            <SelectTrigger>
                <SelectValue placeholder="Cursos" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cursos</SelectLabel>
                    {cursos?.map(({ id, nombre }) => <SelectItem key={id} value={id}>{nombre}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )



}
