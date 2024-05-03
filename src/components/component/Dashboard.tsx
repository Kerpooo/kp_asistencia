import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import { FamiliaCard } from "./dashboard/familia_card/FamiliaCard";
import { AsistenciaCard } from "./dashboard/asistencia_card/AsistenciaCard"

export default function Dashboard() {
  return (

    <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="grid gap-6 md:grid-cols-2">

        {/* NOTE: Card de asistencia */}
        <AsistenciaCard />

        {/* NOTE: Card con familia */}
        <FamiliaCard />

      </div>
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>View attendance statistics.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-semibold tracking-tighter">75%</h3>
              <p className="text-sm font-medium tracking-wider text-center text-gray-500 dark:text-gray-400">
                Attendance
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-semibold tracking-tighter">25%</h3>
              <p className="text-sm font-medium tracking-wider text-center text-gray-500 dark:text-gray-400">
                Absent
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-semibold tracking-tighter">20%</h3>
              <p className="text-sm font-medium tracking-wider text-center text-gray-500 dark:text-gray-400">Late</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-2xl font-semibold tracking-tighter">5%</h3>
              <p className="text-sm font-medium tracking-wider text-center text-gray-500 dark:text-gray-400">Early</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>Manage your courses here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <div>
                <h3 className="text-lg font-semibold">Course Name 1</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Instructor: John Doe</p>
              </div>
              <Button size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <div>
                <h3 className="text-lg font-semibold">Course Name 2</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Instructor: Alice Johnson</p>
              </div>
              <Button size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <div>
                <h3 className="text-lg font-semibold">Course Name 3</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Instructor: Mike Smith</p>
              </div>
              <Button size="sm">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}