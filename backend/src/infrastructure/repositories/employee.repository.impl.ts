import { EmployeeDatasource } from "../../domain/datasources"
import { GetEmployeeDto, GetEmployeesDto } from "../../domain/dtos"
import { EmployeeEntity } from "../../domain/entities"
import { EmployeeRepository } from "../../domain/repositories"

export class EmployeeRepositoryImpl implements EmployeeRepository {

  constructor(
    private readonly datasource: EmployeeDatasource
  ) { }

  getEmployees(getEmployeesDto: GetEmployeesDto): Promise<EmployeeEntity[]> {
    return this.datasource.getEmployees(getEmployeesDto)
  }

  getEmployee(getEmployeeDto: GetEmployeeDto): Promise<EmployeeEntity> {
    return this.datasource.getEmployee(getEmployeeDto)
  }

}
