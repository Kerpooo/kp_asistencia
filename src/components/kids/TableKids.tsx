import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type ListarKidsType } from "@/types/prisma_types"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"
import { differenceInYears } from "date-fns"


interface TableData {
    data: ListarKidsType
}

export const TableKids = ({ data }: TableData) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead className="hidden md:table-cell">Edad</TableHead>
                    <TableHead >Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Encargado</TableHead>
                    <TableHead>
                        <span className="sr-only">Opciones</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(({ id, nombre, apellido, ano_nacimiento, activo, encargado }) => {

                    return (
                        <TableRow key={id}>
                            <TableCell className="font-medium">{nombre}</TableCell>
                            <TableCell className="font-medium">{apellido}</TableCell>
                            <TableCell className="hidden md:table-cell">{differenceInYears(new Date(), ano_nacimiento)} años</TableCell>
                            <TableCell className="flex  w-full h-full md:w-auto md:h-auto">
                                {activo ? (
                                    <Badge className="justify-center whitespace-nowrap min-w-20">Activo</Badge>
                                ) : (
                                    <Badge className="whitespace-nowrap min-w-20" variant="destructive">Inactivo</Badge>
                                )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{encargado.nombre} {encargado.apellido}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <PiDotsThreeOutlineVerticalFill />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Asignar Curso</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}

            </TableBody>
        </Table>
    )
}
