import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { FormFamilia } from "../dashboard/familia_card/FormFamilia"


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
                <FormFamilia />
            </DialogContent>
        </Dialog>
    )
}
