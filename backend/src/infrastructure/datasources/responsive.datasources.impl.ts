import { Sequelize } from "sequelize";
import { EmployeeModel, LocationModel, PositionModel, ResponsiveModel, DeviceModel, SettingsModel } from "../../data";
import { ResponsiveDatasource } from "../../domain/datasources";
import { CreateResponsiveDto } from "../../domain/dtos";
import { ResponsiveEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { ResponsiveMapper } from "../mappers/responsive.mapper";

export class ResponsiveDatasourceImpl implements ResponsiveDatasource {

  async getResponsives(): Promise<ResponsiveEntity[]> {
    try {

      const responsives = await ResponsiveModel.findAll({
        include: [
          {
            model: EmployeeModel,
            as: 'assigner',
            on: Sequelize.literal('assigner.employee_number = responsive.assigner_employee_number'),
            include: [
              { model: PositionModel },
              { model: LocationModel }
            ]
          },
          {
            model: EmployeeModel,
            as: 'receiver',
            on: Sequelize.literal('receiver.employee_number = responsive.receiver_employee_number'),
            include: [
              { model: PositionModel },
              { model: LocationModel }
            ]
          },
          {
            model: EmployeeModel,
            as: 'approver',
            on: Sequelize.literal('approver.employee_number = responsive.approver_employee_number'),
            include: [
              { model: PositionModel },
              { model: LocationModel }
            ]
          },
          {
            model: LocationModel,
            as: 'location',
          },
          {
            model: DeviceModel,
            as: 'device',
          }
        ]
      })

      return responsives.map(ResponsiveMapper.responsiveEntityFromObject)

    } catch (error) {

      console.log(error)

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }

  async createResponsive(registerUserDto: CreateResponsiveDto): Promise<ResponsiveEntity> {
    const {
      device_id,
      brand,
      serial_number,
      model,
      description,
      assigner_employee_number,
      receiver_employee_number,
      location_id } = registerUserDto

    try {

      const device = await DeviceModel.findOne({ where: { id: device_id } })

      const location = await LocationModel.findOne({ where: { id: location_id } })

      const setting = await SettingsModel.findOne({ where: { key: 'reference_number' } })

      if (!setting || !location || !device) throw CustomError.internalError()

      const referenceNumber = +setting.getDataValue("value") + 1

      const id = `CRHT-${location.getDataValue('name')}-AXT-${device.getDataValue('code')}-${referenceNumber}`;

      const newResponsive = await ResponsiveModel.create({
        id,
        reference_number: referenceNumber,
        device_id,
        brand,
        serial_number,
        model,
        comment: description,
        assigner_employee_number,
        receiver_employee_number,
        location_id,
      })

      await newResponsive.save()

      const responsive = await ResponsiveModel.findOne({
        where: { id },
        include:
          [
            {
              model: EmployeeModel,
              as: 'assigner',
              on: Sequelize.literal('assigner.employee_number = responsive.assigner_employee_number'),
              include: [ { model: PositionModel } ]
            },
            {
              model: EmployeeModel,
              as: 'receiver',
              on: Sequelize.literal('receiver.employee_number = responsive.receiver_employee_number'),
              include: [ { model: PositionModel } ]
            },
            {
              model: EmployeeModel,
              as: 'approver',
              on: Sequelize.literal('approver.employee_number = responsive.approver_employee_number'),
              include: [ { model: PositionModel } ]
            },
            {
              model: LocationModel,
              as: 'location',
            },
            {
              model: DeviceModel,
              as: 'device',
            }
          ]

      },)

      if (!responsive) throw CustomError.internalError()

      setting.setDataValue('value', referenceNumber)

      await setting.save()

      return ResponsiveMapper.responsiveEntityFromObject(responsive)

    } catch (error) {

      console.log(error)

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }
}
