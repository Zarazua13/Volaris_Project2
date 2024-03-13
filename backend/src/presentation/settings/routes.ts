import { Router } from "express";
import { SettingsController } from "./controller";
import { SettingsDatasourceImpl } from "../../infrastructure/datasources";
import { SettingsRepositoryImpl } from "../../infrastructure/repositories";

export class SettingsRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new SettingsDatasourceImpl();

    const settingsRepository = new SettingsRepositoryImpl(datasource);

    const controller = new SettingsController(settingsRepository);

    router.get("/", controller.getSettings);
    router.post("/", controller.postSettings);

    return router;
  }
}
