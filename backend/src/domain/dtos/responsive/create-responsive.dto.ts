
export class CreateResponsiveDto {

  private constructor(
    public device_id: string,
    public brand: string,
    public serial_number: string,
    public model: string,
    public description: string,
    public assigner_employee_number: string,
    public approver_employee_number: string,
    public receiver_employee_number: string,
    public location_id: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, CreateResponsiveDto?] {

    const {       
      device_id,
      brand,
      serial_number,
      model,
      description,
      approver_employee_number,
      assigner_employee_number,
      receiver_employee_number,
      location_id 
    } = object

    if(!device_id) return ['Missing device_id']
    if(!brand) return ['Missing brand']
    if(!serial_number) return ['Missing serial_number']
    if(!model) return ['Missing model']
    if(!description) return ['Missing description']
    if(!assigner_employee_number) return ['Missing assigner_employee_number']
    if(!receiver_employee_number) return ['Missing receiver_employee_number']
    if(!location_id) return ['Missing location_id']

    return [undefined, new CreateResponsiveDto(
      device_id,
      brand,
      serial_number,
      model,
      description,
      assigner_employee_number,
      approver_employee_number,
      receiver_employee_number,
      location_id 
    )]
  }

}