'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import MultiSelectFormField from "@/components/ui/multi-select"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/schemas/cursoSchema"
import { type $Enums } from "@prisma/client"
import { formatISO9075 } from "date-fns"
import { editarCurso } from "@/server/actions/curso"
import { type CursoForm } from "@/components/cursos/AddForm"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



interface FormProps {
    id: string
    nombre: string
    hora_inicio: Date
    hora_fin: Date
    dia_semana: $Enums.DIAS[]
    activo: boolean

}

const diasSemana = [
    {
        value: "DOMINGO",
        label: "DOMINGO",
    },
    {
        value: "LUNES",
        label: "LUNES",
    },
    {
        value: "MARTES",
        label: "MARTES",
    },
    {
        value: "MIERCOLES",
        label: "MIERCOLES",
    },
    {
        value: "JUEVES",
        label: "JUEVES",
    },
    {
        value: "VIERNES",
        label: "VIERNES",
    },
    {
        value: "SABADO",
        label: "SABADO",
    },
]


export const EditForm = ({ id, nombre, hora_inicio, hora_fin, dia_semana, activo }: FormProps) => {


    const form = useForm<CursoForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dias_semana: dia_semana,
            nombre: nombre,
            hora_inicio: formatISO9075(hora_inicio, { representation: 'time' }),
            hora_fin: formatISO9075(hora_fin, { representation: 'time' }),
            activo
        },
    })



    async function onSubmit(data: CursoForm) {
        try {
            await editarCurso(id, data)
            toast({
                title: "Datos guardados correctamente",
                variant: "success"
            })
        } catch (error) {
            toast({
                title: "Error al guardar los datos",
                variant: "destructive"
            })
        }
    }


    return (

        <Card>
            <CardHeader>
                <CardTitle className="text-4xl text-center">Curso</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[390px] min-h-[390px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">

                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="activo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-center justify-center">
                                        <FormLabel>Activo</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <FormField
                            control={form.control}
                            name="dias_semana"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dias Semana</FormLabel>
                                    <FormControl>
                                        <MultiSelectFormField

                                            options={diasSemana}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="Select"
                                            variant="inverted"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex justify-between gap-4">
                            <FormField
                                control={form.control}
                                name="hora_inicio"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Inicio</FormLabel>
                                        <FormControl>
                                            <Input className="w-full" placeholder="Inicio" type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hora_fin"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Fin</FormLabel>
                                        <FormControl>
                                            <Input className="w-full" placeholder="Fin" type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="flex justify-center ">
                            <Button className="md:mt-10" variant="default" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}
