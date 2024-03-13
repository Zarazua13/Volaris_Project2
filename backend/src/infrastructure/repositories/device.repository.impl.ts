import { DeviceDatasource } from "../../domain/datasources";
import { GetDevicesDto } from "../../domain/dtos";
import { DeviceEntity } from "../../domain/entities";
import { DeviceRepository } from "../../domain/repositories";

export class DeviceRepositoryImpl implements DeviceRepository {

  constructor(
    private readonly datasource: DeviceDatasource
  ) { }

  getDevices(getDevicesDto: GetDevicesDto): Promise<DeviceEntity[]> {
    return this.datasource.getDevice(getDevicesDto)
  }

}
