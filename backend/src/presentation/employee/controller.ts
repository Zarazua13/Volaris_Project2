import { Request, Response } from "express"
import { EmployeeRepository } from "../../domain/repositories"
import { CustomError } from "../../domain/errors"
import { GetEmployeeDto, GetEmployeesDto } from "../../domain/dtos"
import { GetEmployee, GetEmployees } from "../../domain/use-cases"

export class EmployeeController {

  constructor(
    private readonly employeeRepository: EmployeeRepository,
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

    return res.status(500).json({ error: 'Internal server error' })
  }

  getEmployees = async (req: Request, res: Response) => {

    const [error, getEmployeesDto] = await GetEmployeesDto.getEmployees()

    if (error) return res.status(400).json({ error })

    return new GetEmployees(this.employeeRepository)
      .execute(getEmployeesDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getEmployee = async (req: Request, res: Response) => {

    const { employeeNumber } = req.params

    const [error, getEmployeesDto] = await GetEmployeeDto.getEmployee({ employeeNumber })

    if (error) return res.status(400).json({ error })

    return new GetEmployee(this.employeeRepository)
      .execute(getEmployeesDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
