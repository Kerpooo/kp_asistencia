import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { navItems } from "./SideNavBar"

interface ItemProps {
    url: string
    texto: string
    icono: React.ReactElement

}

const Item = ({ url, texto, icono }: ItemProps) => {
    return (

        <Link className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" href={url}>
            {icono}
            {texto}
        </Link>
    )
}

export const NavBar = () => {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="sm:hidden" size="icon" variant="outline">
                        <PanelLeftIcon className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-xs" side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            href="#"
                        >
                            <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        {

                            navItems.map(({ url, icono, texto }) =>
                                <Item
                                    key={url}
                                    icono={icono}
                                    texto={texto}
                                    url={url}
                                />)
                        }
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">

            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="overflow-hidden rounded-full" size="icon" variant="outline">
                        <img
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                            height={36}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "36/36",
                                objectFit: "cover",
                            }}
                            width={36}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}
interface iconProps {
    className: string
}

function Package2Icon(props: iconProps) {
    return (
        <svg
            {...props}
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
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    )
}


function PanelLeftIcon(props: iconProps) {
    return (
        <svg
            {...props}
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
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="9" x2="9" y1="3" y2="21" />
        </svg>
    )
}


