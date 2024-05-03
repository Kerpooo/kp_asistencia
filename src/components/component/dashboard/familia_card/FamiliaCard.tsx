import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { FormFamilia } from "./FormFamilia";

export const FamiliaCard = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center">Nuevo Integrante</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <FormFamilia />
                </div>
            </CardContent>
        </Card>

    )
}
