export class PostSettingsDto {
  constructor(
    public reference_number: string,
    public default_comment: string,
    public default_assigner: string,
  ) {}

  static postSettings(object: {
    [key: string]: any;
  }): [string?, PostSettingsDto?] {
    const { reference_number, default_comment, default_assigner } = object;

    if (!reference_number) return ["Missing reference_number"];

    if (!default_assigner) return ["Missing default_assigner"];

    if (!default_comment) return ["Missing default_comment"];

    return [
      undefined,
      new PostSettingsDto(reference_number, default_comment, default_assigner),
    ];
  }
}
