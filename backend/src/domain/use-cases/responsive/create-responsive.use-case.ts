import { PdfAdapter } from "../../../config";
import { CreateResponsiveDto } from "../../dtos";
import { ResponsiveEntity } from "../../entities";
import { CustomError } from "../../errors";
import { ResponsiveRepository } from "../../repositories";

interface CreateResponsiveResponse {
  filename: string,
}

interface CreateResponsiveUseCase {
  execute(createResponsiveDto: CreateResponsiveDto): Promise<CreateResponsiveResponse>
}

type GeneratePDFFunction = (payload: ResponsiveEntity) => Promise<string | null>

export class CreateResponsive implements CreateResponsiveUseCase {

  constructor(
    private readonly responsiveRepository: ResponsiveRepository,
    private readonly generatePdf: GeneratePDFFunction = PdfAdapter.generatePDF,
  ) { }

  async execute(createResponsiveDto: CreateResponsiveDto): Promise<CreateResponsiveResponse> {

    const responsive = await this.responsiveRepository.createResponsive(createResponsiveDto)

    const id = await this.generatePdf(responsive)

    if(!id) throw CustomError.internalError()

    return {
      filename: id
    }

  }

}