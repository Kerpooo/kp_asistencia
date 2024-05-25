import { currentUser } from "@clerk/nextjs/server"

export const getUserSessionServer = async () => {

    const user = await currentUser()
    return user

}