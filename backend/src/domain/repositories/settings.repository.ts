import { GetSettingsDto, PostSettingsDto } from "../dtos";
import { SettingsEntity } from "../entities";

export abstract class SettingsRepository {
  abstract getSettings(getSettingsDto: GetSettingsDto): Promise<SettingsEntity>;

  abstract postSettings(
    postSettingsDto: PostSettingsDto,
  ): Promise<SettingsEntity>;
}
