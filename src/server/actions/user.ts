import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const getUserSessionServer = async () => {
    const session = await getServerSession(authOptions)
    return session?.user

}