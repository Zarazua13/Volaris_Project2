import { LocationDatasource } from "../../domain/datasources";
import { GetLocationsDto } from "../../domain/dtos";
import { LocationEntity } from "../../domain/entities";
import { LocationRepository } from "../../domain/repositories";

export class LocationRepositoryImpl implements LocationRepository {

  constructor(
    private readonly datasource: LocationDatasource
  ) { }

  getLocations(getLocationsDto: GetLocationsDto): Promise<LocationEntity[]> {
    return this.datasource.getLocations(getLocationsDto)
  }

}
