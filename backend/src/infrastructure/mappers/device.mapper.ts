import { DeviceEntity } from "../../domain/entities"

export class DeviceMapper {

  static deviceEntityFromObject(object: { [key: string]: any }) {

    const { id, name, code } = object

    return new DeviceEntity(id, name, code)

  }

}
