'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { type z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { formSchema } from "@/schemas/asistenciaSchema"
import { useEffect, useState } from "react"
import { listarKids } from "@/server/actions/kid"
import { type Prisma } from "@prisma/client"
import { tomaAsistencia } from "@/server/actions/asistencia"

type Kids = Prisma.PromiseReturnType<typeof listarKids>

export type AsistenciaForm = z.infer<typeof formSchema>
interface FormAsistenciaProps {
    cursoId: string
    fecha: Date
}

export const FormAsistencia = ({ fecha, cursoId }: FormAsistenciaProps) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            kids: [],
            hora_toma: new Date(),
            asistio: true,


        },
    })



    // NOTE: Reinicial el valor del campo kids para que no se guarden al seleccionar otro curso
    const [kids, setKids] = useState<Kids>()
    useEffect(() => {
        const obtenerKids = async () => {
            const listakids = await listarKids()
            const filteredKids = listakids.filter((kid) => (kid.cursoId === cursoId))
            setKids(filteredKids)
            form.resetField("kids")
            form.setValue("cursoId", cursoId)
            form.setValue("fecha", fecha)

        }
        obtenerKids().catch((e) => `Error al obtener la lista de kids ${e}`)
    }, [cursoId, form, fecha])




    async function onSubmit(data: AsistenciaForm) {
        try {
            await tomaAsistencia(data)
            toast({
                title: "Datos guardados correctamente",
                variant: "success"
            });
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: "Error al guardar los datos",
                    description: error.message,
                    variant: "destructive"
                })
            }
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-8">
                <FormField
                    control={form.control}
                    name="kids"
                    render={() => (
                        <FormItem>
                            {kids?.map(({ id, nombre, apellido }) => (
                                <FormField
                                    key={id}
                                    control={form.control}
                                    name="kids"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {nombre + apellido}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Enviar</Button>
            </form>
        </Form>
    )
}
