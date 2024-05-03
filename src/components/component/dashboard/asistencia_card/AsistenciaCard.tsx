'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useFechaStore } from "@/store/zustand"

import { listarCursos } from "@/server/actions/curso"
import { CalendarAsistencia } from "./CalendarAsistencia"

import { type Cursos, SelectCurso } from "./SelectCurso"
import { useEffect, useState } from "react"


export const AsistenciaCard = () => {
    const { fechaSeleccionada } = useFechaStore()
    const [cursos, setCursos] = useState<Cursos>()

    useEffect(() => {
        const obtenerCursos = async () => {
            const listaCursos = await listarCursos()
            setCursos(listaCursos)
        }
        obtenerCursos().catch((e) => {
            return `Error Obteniendo Cursos ${e}`
        })
    }, []
    )


    return (
        <Card>
            <CardHeader className="p-2 sm:p-6 flex flex-col items-center lg:flex-row">
                <div>
                    <CardTitle className="mt-4 sm:mt-0 mb-4 lg:mb-0">Asistencia</CardTitle>
                </div>
                <div className="gap-2 flex justify-between lg:ml-auto">
                    <SelectCurso cursos={cursos} fecha={fechaSeleccionada} />
                    <CalendarAsistencia fecha={fechaSeleccionada} />
                </div>
            </CardHeader>
            <CardContent>
                <form className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <Checkbox id="1" />
                        <label className="font-medium" htmlFor="1">
                            John Doe
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="2" />
                        <label className="font-medium" htmlFor="2">
                            Alice Johnson
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="3" />
                        <label className="font-medium" htmlFor="3">
                            Mike Smith
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="4" />
                        <label className="font-medium" htmlFor="4">
                            Emily Brown
                        </label>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Submit</Button>
            </CardFooter>
        </Card>
    )
}

