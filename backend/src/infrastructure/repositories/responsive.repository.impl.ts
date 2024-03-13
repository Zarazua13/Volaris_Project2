import { ResponsiveDatasource } from "../../domain/datasources"
import { CreateResponsiveDto, GetResponsivesDto } from "../../domain/dtos"
import { ResponsiveEntity } from "../../domain/entities"
import { ResponsiveRepository } from "../../domain/repositories"

export class ResponsiveRepositoryImpl implements ResponsiveRepository {

  constructor(
    private readonly datasource: ResponsiveDatasource
  ) { }

  getResponsives(getResponsiveDto: GetResponsivesDto): Promise<ResponsiveEntity[]> {
    return this.datasource.getResponsives(getResponsiveDto)
  }

  createResponsive(createResponsiveDto: CreateResponsiveDto): Promise<ResponsiveEntity> {
    return this.datasource.createResponsive(createResponsiveDto)
  }

}
