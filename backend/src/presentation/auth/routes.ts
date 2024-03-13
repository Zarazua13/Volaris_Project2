import { Router } from "express";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { AuthDatasourceImpl } from "../../infrastructure/datasources";
import { AuthRepositoryImpl } from "../../infrastructure/repositories";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new AuthDatasourceImpl()

    const authRepository = new AuthRepositoryImpl(datasource)

    const controller = new AuthController(authRepository)

    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)
    router.get('/users', AuthMiddleware.validateJWT, controller.getUsers)

    return router
  }
}
