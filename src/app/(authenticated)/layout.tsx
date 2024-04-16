
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
        <div className="flex-col md:flex" >
            {children}
        </div >
    );
}