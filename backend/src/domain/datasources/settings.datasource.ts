import { SettingsEntity } from "../entities";
import { GetSettingsDto, PostSettingsDto } from "../dtos";

export abstract class SettingsDatasource {
  abstract getSettings(getSettingsDto: GetSettingsDto): Promise<SettingsEntity>;

  abstract postSettings(
    postSettingsDto: PostSettingsDto,
  ): Promise<SettingsEntity>;
}
