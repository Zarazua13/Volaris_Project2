import { PostSettingsDto } from "../../dtos";
import { SettingsRepository } from "../../repositories";

interface Settings {
  referenceNumber: number;
  defaultAssigner: string;
  defaultComment: string;
}

interface PostSettingsUseCase {
  execute(postSettingsDto: PostSettingsDto): Promise<Settings>;
}

export class PostSettings implements PostSettingsUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute(postSettingsDto: PostSettingsDto): Promise<Settings> {
    const settings =
      await this.settingsRepository.postSettings(postSettingsDto);

    return settings;
  }
}
