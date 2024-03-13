import { Router } from "express";
import { ResponsiveController } from "./controller";
import { ResponsiveDatasourceImpl } from "../../infrastructure/datasources";
import { ResponsiveRepositoryImpl } from "../../infrastructure/repositories";

export class ResponsiveRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new ResponsiveDatasourceImpl()

    const responsiveRepository = new ResponsiveRepositoryImpl(datasource)

    const controller = new ResponsiveController(responsiveRepository)

    router.get('/', controller.getResponsives)

    router.post('/', controller.createResponsive)

    return router
  }
}
