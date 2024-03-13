import { Employee } from "@/interfaces"
import { AtSignIcon, UserCircle, MapPin } from "lucide-react"
import { EmployeeDetailItem } from "./employee-detail-item"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components"

interface Props {
  employee: Employee
}

export const EmployeeDetails = ({ employee }: Props) => {

  return (
    <div className="mt-8 lg:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-4">
            {employee.name}
          </CardTitle>
          {employee.position && <CardDescription className="text-xs text-muted-foreground">
            {employee.position.name}
          </CardDescription>}
        </CardHeader>
        <CardContent>
          <EmployeeDetailItem icon={<AtSignIcon />} title={employee.email} subtitle="Correo electrónico" />
          {employee.location && <EmployeeDetailItem icon={<MapPin />} title={employee.location.name} subtitle="Ubicación" />}
          {
            employee.boss &&
            <>
              <EmployeeDetailItem icon={<UserCircle />} title={employee.boss.name} subtitle="Jefe" />
              {employee.boss.position && <EmployeeDetailItem icon={<UserCircle />} title={employee.boss.position.name} subtitle="Puesto del jefe" />}
            </>
          }
        </CardContent>
      </Card>
    </div>
  )
}
