import { LocationEntity } from "../../domain/entities";

export class LocationMapper {

  static locationEntityFromObject(object: { [key: string]: any }) {

    const { id, name } = object

    return new LocationEntity(id, name)

  }

}
