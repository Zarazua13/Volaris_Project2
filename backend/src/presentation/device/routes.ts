import { Router } from "express";
import { DeviceController } from "./controller";
import { DeviceDatasourceImpl } from "../../infrastructure/datasources";
import { DeviceRepositoryImpl } from "../../infrastructure/repositories";

export class DeviceRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new DeviceDatasourceImpl()

    const deviceRepository = new DeviceRepositoryImpl(datasource)

    const controller = new DeviceController(deviceRepository)

    router.get('/', controller.getDevices)

    return router
  }
}
