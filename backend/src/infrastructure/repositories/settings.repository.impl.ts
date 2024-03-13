import { SettingsDatasource } from "../../domain/datasources";
import { GetSettingsDto, PostSettingsDto } from "../../domain/dtos";
import { SettingsEntity } from "../../domain/entities";
import { SettingsRepository } from "../../domain/repositories";

export class SettingsRepositoryImpl implements SettingsRepository {
  constructor(private readonly datasource: SettingsDatasource) {}

  getSettings(getSettingsDto: GetSettingsDto): Promise<SettingsEntity> {
    return this.datasource.getSettings(getSettingsDto);
  }
  postSettings(postSettingsDto: PostSettingsDto): Promise<SettingsEntity> {
    return this.datasource.postSettings(postSettingsDto);
  }
}
