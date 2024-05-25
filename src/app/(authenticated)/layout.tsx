
import { NavBar } from "@/components/navbar/NavBar"
import { SideNavBar } from "@/components/navbar/SideNavBar"


export default async function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40" >
            <SideNavBar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <NavBar />
                {children}
            </div>
        </div >
    )
}