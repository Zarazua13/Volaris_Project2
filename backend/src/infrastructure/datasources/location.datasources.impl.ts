import LocationModel from "../../data/mysql/models/location.model";
import { LocationDatasource } from "../../domain/datasources";
import { LocationEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { LocationMapper } from "../mappers/location.mapper";

export class LocationDatasourceImpl implements LocationDatasource {

  async getLocations(): Promise<LocationEntity[]> {
    try {

      const locations = await LocationModel.findAll()

      return locations.map(LocationMapper.locationEntityFromObject)

    } catch (error) {

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }
}
