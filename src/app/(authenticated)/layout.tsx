
import { SideNavBar } from "@/components/component/SideNavBar";
import { NavBar } from "@/components/component/NavBar";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions)


    if (!session) {
        redirect('/api/auth/signin')

    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40" >
            <SideNavBar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <NavBar />
                {children}
            </div>
        </div >
    );
}