import { Location } from "@/interfaces/locations"
import { Position } from "@/interfaces/position"

export interface Employee {
  id: string
  name: string
  employeeNumber: string
  email: string
  position: Position | null
  location: Location | null
  boss: Employee | null
}