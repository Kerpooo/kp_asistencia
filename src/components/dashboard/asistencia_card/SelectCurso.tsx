"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { listarCursos } from "@/server/actions/curso"
import { useCursoStore } from "@/store/zustand"
import { type Prisma, DIAS } from "@prisma/client"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"



export type Cursos = Prisma.PromiseReturnType<typeof listarCursos>
interface SelectCursoProps {
    fecha: Date
}

export const SelectCurso = ({ fecha }: SelectCursoProps) => {
    const { setCursoSeleccionado, cursoSeleccionado } = useCursoStore()
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
                    if (cursosDia.length) {
                        setCursos(cursosDia)
                    }
                    else {
                        setCursos(undefined)
                        setCursoSeleccionado("")
                    }
                }
            }
        }
        obtenerCursos().catch((e) => {
            return `Error Obteniendo Cursos ${e}`
        })
    }, [fecha, diaActual, setCursoSeleccionado]
    )
    // Selecciona los cursos que se den ese dia especifico

    if (cursos && cursos.length > 0) {
        return (
            <Select onValueChange={(value) => setCursoSeleccionado(value)} value={cursoSeleccionado}>
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

    return (

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    >
                        Cursos
                        <CaretSortIcon className="h-4 w-4 opacity-50" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>No hay cursos asignados este día</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )



}
