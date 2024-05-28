import { SignIn } from "@clerk/nextjs"

export default function Page() {

    return (
        <div className="flex justify-center items-center p-20">
            <SignIn forceRedirectUrl='/dashboard'/>
        </div>
    )

}