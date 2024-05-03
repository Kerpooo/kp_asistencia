import { Checkbox } from "@/components/ui/checkbox"
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
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
import { listarCursos } from "@/server/actions/curso"
import { CalendarAsistencia } from "./CalendarAsistencia"


const SelectCurso = async () => {

    const cursos = await listarCursos()

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Cursos" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cursos</SelectLabel>
                    {cursos.map(({ id, nombre }) => <SelectItem key={id} value={id}>{nombre}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )

}

export const AsistenciaCard = () => {
    return (
        <Card>
            <CardHeader className="p-2 sm:p-6 flex flex-col items-center lg:flex-row">
                <div>
                    <CardTitle className="mt-4 sm:mt-0 mb-4 lg:mb-0">Asistencia</CardTitle>
                </div>
                <div className="gap-2 flex justify-between lg:ml-auto">
                    <SelectCurso />
                    <CalendarAsistencia />
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

