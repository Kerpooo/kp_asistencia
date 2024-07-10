'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { type z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { formSchema } from "@/schemas/asistenciaSchema"
import { useEffect, useState } from "react"
import { tomaAsistencia } from "@/server/actions/asistencia"
import { listarEstudiantesCurso } from "@/server/actions/curso"
import { type ListaAlumnosCurso } from "@/types/prisma_types"


export type AsistenciaForm = z.infer<typeof formSchema>
interface FormAsistenciaProps {
    cursoId: string
    fecha: Date
}


export const FormAsistencia = ({ fecha, cursoId }: FormAsistenciaProps) => {
    const form = useForm<AsistenciaForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kids: [],
            hora_toma: new Date(),
        },
    })

    const [kids, setKids] = useState<ListaAlumnosCurso | undefined>([])

    useEffect(() => {
        const obtenerKids = async () => {
            const listakids = await listarEstudiantesCurso(cursoId)
            setKids(listakids)
            form.reset({
                kids: listakids?.map(kid => ({ kidId: kid.id, asistio: false })),
                cursoId,
                fecha,
                hora_toma: new Date(),
            })
        }
        obtenerKids().catch((e) => `Error al obtener la lista de kids ${e}`)
    }, [cursoId, form, fecha])

    async function onSubmit(data: AsistenciaForm) {
        try {
            await tomaAsistencia(data)
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

    if (cursoId) {
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-8">
                    <FormField
                        control={form.control}
                        name="kids"
                        render={() => (
                            <FormItem>
                                {kids?.map((kid, index) => (
                                    <Controller
                                        key={kid.id}
                                        control={form.control}
                                        name={`kids.${index}.asistio`}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={(checked) => {
                                                            field.onChange(checked)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {kid.nombre + " " + kid.apellido}
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Guardar</Button>
                </form>
            </Form>
        )
    }

    return <h1 className="text-center">Seleccione un curso</h1>
}