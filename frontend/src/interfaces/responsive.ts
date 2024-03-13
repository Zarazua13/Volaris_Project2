import { Employee, Location, Device } from "@/interfaces/"

export interface Responsive {
  id: string
  serialNumber: string
  brand: string
  model: string
  description: string
  isSigned: boolean
  createdAt: string
  location: Location
  device: Device
  assigner: Employee
  approver: Employee
  receiver: Employee
}