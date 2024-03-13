export class SettingsEntity {
  constructor(
    public referenceNumber: number,
    public defaultAssigner: string,
    public defaultComment: string,
  ) {}
}
