import { DeviceEntity } from "./device.entity";
import { EmployeeEntity } from "./employee.entity";
import { LocationEntity } from "./location.entity";

export class ResponsiveEntity {

  constructor(
    public id: string,
    public serialNumber: string,
    public brand: string,
    public model: string,
    public comment: string,
    public isSigned: string,
    public createdAt: string,
    public referenceNumber: string,
    public assigner: EmployeeEntity,
    public location: LocationEntity,
    public device: DeviceEntity,
    public approver: EmployeeEntity,
    public receiver: EmployeeEntity,
  ) {}

}