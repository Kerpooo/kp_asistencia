import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import Link from "next/link"


import { FaPencil, FaPersonShelter } from "react-icons/fa6"
import { TbMoodKid } from "react-icons/tb"
import { MdSpaceDashboard } from "react-icons/md"

export const navItems = [
    {
        url: "/dashboard",
        texto: "Dashboard",
        icono: <MdSpaceDashboard className="h-5 w-5" />
    },
    {
        url: "/kids",
        texto: "Niño",
        icono: <TbMoodKid className="h-5 w-5" />
    },
    {
        url: "/clases",
        texto: "Clases",
        icono: <FaPencil className="h-5 w-5" />
    },
    {
        url: "/encargado",
        texto: "Encargado",
        icono: <FaPersonShelter className="h-5 w-5" />
    },

]

interface ItemProps {
    url: string
    texto: string
    icono: React.ReactElement

}


const Item = ({ url, texto, icono }: ItemProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    href={url}
                >
                    {icono}
                    <span className="sr-only">{texto}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{texto}</TooltipContent>
        </Tooltip>

    )
}


export const SideNavBar = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Link
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        href="#"
                    >
                        <span className="sr-only">Kid´s Place</span>
                    </Link>

                    {
                        navItems.map(({ url, icono, texto }) =>

                            <Item
                                key={url}
                                icono={icono}
                                texto={texto}
                                url={url}
                            />

                        )
                    }
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                href="#"
                            >
                                <SettingsIcon />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}


function SettingsIcon() {
    return (
        <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


