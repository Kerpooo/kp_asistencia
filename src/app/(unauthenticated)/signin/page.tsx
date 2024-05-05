import { SignInButton } from "@/components/session/SignInButton";
import { getProviders } from "next-auth/react"
import Image from "next/image";

export default async function SignIn() {

    //Obtiene los proveedores de auth en este caso solo google :D
    const provider = await getProviders()
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden lg:block">
                {/* TODO: Poner la imagen correspondiente */}
                <Image
                    alt="Image"
                    className="object-cover w-full h-full aspect-none lg:aspect-w-1 lg:aspect-h-1"
                    height="900"
                    src="/placeholder.svg"
                    width="1200"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto w-[350px] space-y-6">
                    <div className="space-y-2 text-center">

                        {/* TODO: Poner el logo de kidsplace */}
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        <p className="text-gray-500 dark:text-gray-400">Ingresa con tu cuenta de google</p>
                    </div>
                    <div className="space-y-4">
                        <SignInButton provider={provider} />
                    </div>

                </div>
            </div>
        </div>
    )
}