import { Request, Response } from "express";
import { CustomError } from "../../domain/errors";
import { SettingsRepository } from "../../domain/repositories";
import { GetSettingsDto, PostSettingsDto } from "../../domain/dtos";
import { GetSettings, PostSettings } from "../../domain/use-cases";

export class SettingsController {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    return res.status(500).json({ error: "Internal server error" });
  };

  getSettings = async (req: Request, res: Response) => {
    const [error, getSettingsDto] = GetSettingsDto.getSettings();

    if (error) return res.status(400).json({ error });

    return new GetSettings(this.settingsRepository)
      .execute(getSettingsDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  postSettings = async (req: Request, res: Response) => {
    const [error, postSettingsDto] = PostSettingsDto.postSettings(req.body);

    if (error) return res.status(400).json(error);

    return new PostSettings(this.settingsRepository)
      .execute(postSettingsDto!)
      .then((data) => res.json(data))
      .catch((e) => this.handleError(e, res));
  };
}
