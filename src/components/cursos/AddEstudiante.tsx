"use client"
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Alumnos } from "@/types/prisma_types"
import { useEstudiantes, } from "@/hooks/estudiantes"
import { AlumnosCurso } from "./CardEstudiantes"



export const AddEstudiante = ({ listaInscritos }: AlumnosCurso) => {

    const { estudiantes } = useEstudiantes()
    const estudiantesNoInscritos = estudiantes.filter((estudiante) =>
        !listaInscritos.some(inscrito => inscrito.id === estudiante.id)
    )
    const [estudiantesSeleccionados, setEstudiantesSeleccionado] = useState<Alumnos[]>([])




    return (
        <Dialog>
            <DialogTrigger asChild>

                <Button
                    size="icon"
                    variant="outline"
                    className="ml-auto rounded-full"
                >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Nuevo Alumno</span>
                </Button>

            </DialogTrigger>

            <DialogContent className="gap-0 p-0 outline-none">
                <DialogHeader className="px-4 pb-4 pt-5">
                    <DialogTitle>New message</DialogTitle>
                    <DialogDescription>
                        Invite a user to this thread. This will create a new group
                        message.
                    </DialogDescription>
                </DialogHeader>
                <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
                    <CommandInput placeholder="Search user..." />
                    <CommandList>
                        <CommandEmpty>No users found.</CommandEmpty>
                        <CommandGroup className="p-2 max-h-[172px] overflow-y-auto">

                            {



                                estudiantesNoInscritos.map((estudiante) => (
                                    <CommandItem
                                        key={estudiante.id}
                                        className="flex items-center px-2"
                                        onSelect={() => {
                                            if (estudiantesSeleccionados.includes(estudiante)) {
                                                return setEstudiantesSeleccionado(
                                                    estudiantesSeleccionados.filter(
                                                        (selectedUser) => selectedUser !== estudiante
                                                    )
                                                )
                                            }

                                            return setEstudiantesSeleccionado(
                                                [...estudiantesNoInscritos].filter((u) =>
                                                    [...estudiantesSeleccionados, estudiante].includes(u)
                                                )
                                            )
                                        }}
                                    >
                                        <Avatar>
                                            <AvatarFallback>{estudiante.nombre[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2">
                                            <p className="text-sm font-medium leading-none">
                                                {estudiante.nombre}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {estudiante.apellido}
                                            </p>
                                        </div>
                                        {estudiantesSeleccionados.includes(estudiante) ? (
                                            <CheckIcon className="ml-auto flex h-5 w-5 text-primary" />
                                        ) : null}
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                    {estudiantesSeleccionados.length > 0 ? (
                        <div className="flex -space-x-2 overflow-hidden">
                            {estudiantesSeleccionados.map((estudiante) => (
                                <Avatar
                                    key={estudiante.id}
                                    className="inline-block border-2 border-background"
                                >
                                    <AvatarFallback>{estudiante.nombre[0]}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Select users to add to this thread.
                        </p>
                    )}
                    <Button
                        disabled={estudiantesSeleccionados.length < 1}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
