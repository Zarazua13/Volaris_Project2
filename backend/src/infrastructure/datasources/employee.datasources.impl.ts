import { FindOptions } from "sequelize";
import { EmployeeModel, LocationModel, PositionModel } from "../../data";
import { EmployeeMapper } from "../mappers/employee.mapper";
import { EmployeeDatasource } from "../../domain/datasources";
import { EmployeeEntity } from "../../domain/entities";
import { GetEmployeeDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors";

const findOptions: FindOptions = {
  include: [{
    model: PositionModel,
  },
  {
    model: LocationModel,
  },
  {
    model: EmployeeModel,
    as: 'boss',
    include: [
      { model: PositionModel },
      { model: LocationModel }
    ]
  }
  ],
}

export class EmployeeDatasourceImpl implements EmployeeDatasource {

  async getEmployees(): Promise<EmployeeEntity[]> {
    try {

      const employees = await EmployeeModel.findAll(findOptions)

      return employees.map((EmployeeMapper.employeeEntityFromObject))

    } catch (error) {

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }

  async getEmployee(getEmployeeDto: GetEmployeeDto): Promise<EmployeeEntity> {
    try {

      const { employeeNumber } = getEmployeeDto

      const employee = await EmployeeModel.findOne({
        ...findOptions,
        where: { employee_number: employeeNumber }
      }) as { [key: string]: any; }

      return EmployeeMapper.employeeEntityFromObject(employee)

    } catch (error) {

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }
}
