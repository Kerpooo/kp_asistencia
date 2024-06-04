import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

import { TableKids } from "@/components/kids/TableKids"
import { listarKids } from "@/server/actions/kid"
import { AddDialog } from "@/components/kids/AddDialog"

export default async function KidsPage() {

    const kidsList = await listarKids()

    return (
        <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="ml-auto flex items-center gap-2">
                <AddDialog />
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Kids</CardTitle>
                </CardHeader>
                <CardContent>
                    <TableKids data={kidsList} ></TableKids>
                </CardContent>
            </Card>
        </main>
    )
}