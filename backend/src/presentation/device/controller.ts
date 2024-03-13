import { Request, Response } from "express";
import { DeviceRepository } from "../../domain/repositories";
import { CustomError } from "../../domain/errors";
import { GetDevicesDto } from "../../domain/dtos";
import { GetDevices } from "../../domain/use-cases";

export class DeviceController {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    return res.status(500).json({ error: "Internal server error" });
  };

  getDevices = async (req: Request, res: Response) => {
    const getDevicesDto = GetDevicesDto.getDevices();

    return new GetDevices(this.deviceRepository)
      .execute(getDevicesDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
