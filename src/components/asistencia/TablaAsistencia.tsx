import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"


interface TablaAsistenciaProps {
    data: {
        kidId: string
        asistio: boolean
        kid: {
            nombre: string
            apellido: string
        }
    }[]
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
                    data?.map(({ asistio, kidId, kid }) => {
                        return (
                            <TableRow key={kidId}>
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
