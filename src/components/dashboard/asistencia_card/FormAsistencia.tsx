'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
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
import { Prisma } from "@prisma/client"

type Kids = Prisma.PromiseReturnType<typeof listarKids>

type AsistenciaForm = z.infer<typeof formSchema>
interface FormAsistenciaProps {
    cursoId?: string
    fecha: Date
}

export const FormAsistencia = ({ fecha, cursoId }: FormAsistenciaProps) => {

    const [kids, setKids] = useState<Kids>()
    useEffect(() => {
        const obtenerKids = async () => {
            const listakids = await listarKids()
            setKids(listakids)

        }
        obtenerKids().catch((e) => `Error al obtener la lista de kids ${e}`)
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            kids: [],
            fecha: fecha,
            hora_toma: new Date(),


        },
    })


    async function onSubmit(data: AsistenciaForm) {
        try {
            // await crearFamilia(data);
            toast({
                title: "Datos guardados correctamente",
                variant: "success"
            });
        } catch (error) {
            toast({
                title: "Error al guardar los datos",
                variant: "destructive"
            });
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form>
    )
}
