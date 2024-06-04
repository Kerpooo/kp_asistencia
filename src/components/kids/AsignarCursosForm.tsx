"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type z } from "zod"

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
import { crearCurso } from "@/server/actions/curso"

export const AsignarCursosForm = () => {
    return (
        <div>AsignarCursosForm</div>
    )
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

export type CursoForm = z.infer<typeof formSchema>

export default function AddForm() {
    const form = useForm<CursoForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dias_semana: [],
            activo: true,
            hora_fin: "",
            hora_inicio: "",
            nombre: ""
        },
    })

    async function onSubmit(data: CursoForm) {
        try {
            await crearCurso(data)
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

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                                    animation={0}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre" {...field} />
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

                <div className="flex justify-center">
                    <Button variant="outline" type="submit">
                        Guardar
                    </Button>
                </div>
            </form>
        </Form>
    )
}