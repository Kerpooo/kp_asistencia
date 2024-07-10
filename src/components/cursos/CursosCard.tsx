import {
    CheckCircledIcon,
    CrossCircledIcon,

} from "@radix-ui/react-icons"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatISO9075 } from "date-fns"
import { type CursoCardType } from "@/types/prisma_types"
import Link from "next/link"

interface CardProps extends CursoCardType { }

export default function CursosCard({ id, nombre, activo, dia_semana, hora_inicio, hora_fin, _count }: CardProps) {
    const inscritos = _count.Kid
    return (
        <Link href={`cursos/${id}`}>
            <Card className="w-full">
                <CardHeader className="grid grid-cols-1 md:grid-cols-[1fr_110px] items-start gap-4">
                    <div className="space-y-1">
                        <CardTitle>{nombre}</CardTitle>
                        <CardDescription>
                            {formatISO9075(hora_inicio, { representation: 'time' }).replace(':00', '')} - {formatISO9075(hora_fin, { representation: 'time' }).replace(':00', '')}
                        </CardDescription>
                        <CardDescription>
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-muted-foreground space-y-4 md:space-y-0">
                        <div className="flex flex-wrap gap-2 items-center">
                            {dia_semana.map((dia) =>
                                <Badge className="hover:cursor-pointer" key={dia}>{dia}</Badge>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div>
                        Inscritos: {inscritos}
                    </div>
                    <div className="flex items-center gap-2">
                        {activo ? (
                            <>
                                <CheckCircledIcon className="text-green-600 h-8 w-h-8" />
                                <span>Activo</span>
                            </>
                        ) : (
                            <>
                                <CrossCircledIcon className="text-red-600 h-8 w-h-8" />
                                <span>Inactivo</span>
                            </>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </Link>

    )
}