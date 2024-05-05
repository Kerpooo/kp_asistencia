"use client"

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
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { es } from 'date-fns/locale';
import { crearFamilia } from "@/server/actions/familia"

const formSchema = z.object({
    // encargadoShema
    encargadoNombre: z.string({ required_error: "Nombre es obligatorio" }).min(2).max(10),
    encargadoApellido: z.string({ required_error: "Apellido es obligatorio" }).min(2).max(10),
    encargadoEmail: z.string({ required_error: "Correo es obligatorio" }).min(2).max(30).email("Este no es un correo valido"),
    encargadoTelefono: z.string().min(2).max(50),


    // kidSchema
    kidNombre: z.string({ required_error: "Nombre es obligatorio" }).min(2).max(10),
    kidApellido: z.string({ required_error: "Nombre es obligatorio" }).min(2).max(10),
    anoNacimiento: z.date({ required_error: "Fecha de nacimiento obligatoria" }),
})

type FamilyFormValues = z.infer<typeof formSchema>


export const FormFamilia = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            // Encargado
            encargadoNombre: "",
            encargadoApellido: "",
            encargadoEmail: "",
            encargadoTelefono: "",

            // kid
            kidNombre: "",
            kidApellido: "",
            anoNacimiento: new Date('2020-01-01T00:00:00'),


        },
    })



    async function onSubmit(data: FamilyFormValues) {
        try {
            await crearFamilia(data);
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

                <div>
                    <h3 className="text-lg font-medium">Encargado</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">

                        <FormField
                            control={form.control}
                            name="encargadoNombre"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="encargadoApellido"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="encargadoEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="encargadoTelefono"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel>Telefono</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium">Niño</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">

                        <FormField
                            control={form.control}
                            name="kidNombre"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="kidApellido"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-y-2">
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="anoNacimiento"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <div className="space-y-2">
                                        <FormLabel>Fecha de Nacimiento</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "P", { locale: es })
                                                        ) : (
                                                            <span>Seleccione una fecha</span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    locale={es}

                                                    captionLayout="dropdown-buttons" fromYear={2020} toDate={new Date()}
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                    </div>
                </div>


                <Button type="submit">Enviar</Button>
            </form>
        </Form>
    )
}
