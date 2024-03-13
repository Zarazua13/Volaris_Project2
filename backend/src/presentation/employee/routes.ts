import { Router } from "express";
import { EmployeeController } from "./controller";
import { EmployeeDatasourceImpl } from "../../infrastructure/datasources";
import { EmployeeRepositoryImpl } from "../../infrastructure/repositories";

export class EmployeeRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new EmployeeDatasourceImpl()

    const employeeRepository = new EmployeeRepositoryImpl(datasource)

    const controller = new EmployeeController(employeeRepository)

    router.get('/:employeeNumber', controller.getEmployee)

    router.get('/', controller.getEmployees)


    return router
  }
}
