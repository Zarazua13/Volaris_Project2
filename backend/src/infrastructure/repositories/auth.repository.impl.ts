import { AuthDatasource } from "../../domain/datasources"
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos"
import { UserEntity } from "../../domain/entities"
import { AuthRepository } from "../../domain/repositories"

export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly datasource: AuthDatasource
  ) { }
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.datasource.login(loginUserDto)
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.datasource.register(registerUserDto)
  }

}
