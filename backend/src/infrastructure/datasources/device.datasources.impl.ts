import DeviceModel from "../../data/mysql/models/device.model";
import { DeviceDatasource } from "../../domain/datasources";
import { DeviceEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { DeviceMapper } from "../mappers";

export class DeviceDatasourceImpl implements DeviceDatasource {

  async getDevice(): Promise<DeviceEntity[]> {
    try {

      const devices = await DeviceModel.findAll()

      return devices.map(DeviceMapper.deviceEntityFromObject)

    } catch (error) {

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }
}
