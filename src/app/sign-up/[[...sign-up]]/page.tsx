import { SignUp } from "@clerk/nextjs"

export default function Page() {
    return (
        <div className="flex justify-center items-center p-20">
            < SignUp forceRedirectUrl='/dashboard' />
        </div>
    )

}