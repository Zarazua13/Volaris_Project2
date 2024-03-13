import SettingsModel from "../../data/mysql/models/settings.model";
import { SettingsDatasource } from "../../domain/datasources";
import { PostSettingsDto } from "../../domain/dtos";
import { SettingsEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { SettingsMapper } from "../mappers";

export class SettingsDatasourceImpl implements SettingsDatasource {
  async postSettings(postSettingsDto: PostSettingsDto) {
    try {
      await Promise.all(
        Object.entries(postSettingsDto).map(async ([key, value]) =>
          SettingsModel.update({ value }, { where: { key } }),
        ),
      );

      return await this.getSettings();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalError();
    }
  }

  async getSettings(): Promise<SettingsEntity> {
    try {
      const settings = await SettingsModel.findAll();

      return SettingsMapper.settingsEntityFromObject(settings);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalError();
    }
  }
}
