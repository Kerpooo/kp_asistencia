'use client'

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useCursoStore, useFechaStore } from "@/store/zustand"
import { CalendarAsistencia } from "./CalendarAsistencia"
import { SelectCurso } from "./SelectCurso"
import { FormAsistencia } from "./FormAsistencia"


const AsistenciaCard = () => {
    const { fechaSeleccionada } = useFechaStore()
    const { cursoSeleccionado } = useCursoStore()

    return (
        <Card>
            <CardHeader className="p-2 sm:p-6 flex flex-col items-center lg:flex-row">
                <div>
                    <CardTitle className="mt-4 sm:mt-0 mb-4 lg:mb-0">Asistencia</CardTitle>
                </div>
                <div className="gap-2 flex justify-between lg:ml-auto">
                    <SelectCurso fecha={fechaSeleccionada} />
                    <CalendarAsistencia fecha={fechaSeleccionada} />
                </div>
            </CardHeader>
            <CardContent>
                <FormAsistencia fecha={fechaSeleccionada} cursoId={cursoSeleccionado} />

            </CardContent>
        </Card>
    )
}

export default AsistenciaCard
