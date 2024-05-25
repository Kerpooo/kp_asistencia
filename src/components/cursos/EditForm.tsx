import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { type $Enums } from "@prisma/client"

interface FormProps {
    id: string
    nombre: string
    hora_inicio: Date
    hora_fin: Date
    dia_semana: $Enums.DIAS[]
    activo: boolean

}

export const EditForm = ({ id, nombre, hora_inicio, hora_fin, dia_semana, activo }: FormProps) => {

    return (

        <form>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nombre" className="text-right">
                        Nombre
                    </Label>
                    <Input id="nombre" defaultValue={nombre} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">

                    </Label>
                    <Input id="username" type="time" defaultValue={`${hora_inicio.getUTCHours()}:${hora_inicio.getUTCMinutes()}`} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>


    )
}
