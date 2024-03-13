import { ResponsiveEntity } from "../../domain/entities";
import { DeviceMapper } from "./device.mapper";
import { EmployeeMapper } from "./employee.mapper";
import { LocationMapper } from "./location.mapper";

export class ResponsiveMapper {

  static responsiveEntityFromObject(object: { [key: string]: any }) {

    const {
      id,
      serial_number,
      brand,
      model,
      comment,
      is_signed,
      created_at,
      reference_number,
    } = object

    const approver = object.approver && EmployeeMapper.employeeEntityFromObject(object.approver)
    const assigner = object.assigner && EmployeeMapper.employeeEntityFromObject(object.assigner)
    const receiver = object.receiver && EmployeeMapper.employeeEntityFromObject(object.receiver)
    const location = object.location && LocationMapper.locationEntityFromObject(object.location)
    const device = object.device && DeviceMapper.deviceEntityFromObject(object.device)

    return new ResponsiveEntity(
      id,
      serial_number,
      brand,
      model,
      comment,
      is_signed,
      created_at,
      reference_number,
      assigner,
      location,
      device,
      approver,
      receiver,
    )

  }

}
