import { Device } from "./device.interface";
import { Employee } from "./employee.interface"
import { Location } from "./location.interface";

export interface Responsive {
  id: string,
  serialNumber: string,
  brand: string,
  model: string,
  comment: string,
  isSigned: string,
  createdAt: string,
  referenceNumber: string,
  location: Location,
  device: Device,
  assigner: Employee,
  approver: Employee,
  receiver: Employee,
}