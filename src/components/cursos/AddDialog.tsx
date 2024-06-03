import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import AddForm from "./AddForm"



export const AddDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8 gap-1" size="sm">
                    <PlusCircledIcon className="h-3.5 w-3.5" />
                    Nuevo Curso
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Crear Curso
                    </DialogTitle>
                    <DialogDescription>
                        Añade nuevos cursos aquí.
                    </DialogDescription>
                </DialogHeader>
                <AddForm />
            </DialogContent>

        </Dialog>
    )
}
