import { UserEntity } from "../../domain/entities"
import { CustomError } from "../../domain/errors"

export class UserMapper {

  static userEntityFromObject(object: { [key: string]: any }) {

    const { id, _id, name, email, password, role } = object

    if (!id || !_id) throw CustomError.badRequest('Missing id')

    if (!name) throw CustomError.badRequest('Missing name')

    if (!email) throw CustomError.badRequest('Missing email')

    if (!password) throw CustomError.badRequest('Missing password')

    if (!role) throw CustomError.badRequest('Missing roles')

    return new UserEntity(
      _id || id,
      name,
      email,
      password,
      role
    )

  }

}
