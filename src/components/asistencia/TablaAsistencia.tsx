import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { type ListaAsistenciaType } from "@/types/prisma_types"
import { Badge } from "../ui/badge"


interface TablaAsistenciaProps {
    data: ListaAsistenciaType
}


export const TablaAsistencia = ({ data }: TablaAsistenciaProps) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">Nombre</TableHead>
                    <TableHead className="w-[100px] text-center">Apellido</TableHead>
                    <TableHead className="w-[100px] text-center">Asistencia</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    data?.map(({ asistio, kid }) => {
                        return (
                            <TableRow key={kid.id}>
                                <TableCell className="font-semibold  text-center">{kid.nombre} </TableCell>
                                <TableCell className="font-semibold  text-center">{kid.apellido} </TableCell>
                                <TableCell className="flex justify-center items-center w-full h-full md:w-auto md:h-auto">
                                    {asistio ? (
                                        <Badge className="justify-center whitespace-nowrap min-w-20">Asistio</Badge>
                                    ) : (
                                        <Badge className="whitespace-nowrap min-w-20" variant="destructive">No Asistio</Badge>
                                    )}
                                </TableCell>

                            </TableRow>

                        )
                    })
                }

            </TableBody>
        </Table>

    )
}
