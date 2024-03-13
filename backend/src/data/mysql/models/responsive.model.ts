import { DataTypes, Model } from "sequelize"
import EmployeeModel from "./employee.model"
import LocationModel from "./location.model"
import DeviceModel from "./device.model"

import sequelize from '../mysql-database'

export class ResponsiveModel extends Model {}

ResponsiveModel.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    serial_number: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    comment: DataTypes.STRING,
    reference_number: DataTypes.INTEGER,
    is_signed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    assigner_employee_number: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: EmployeeModel,
        key: 'employee_number',
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
      model: LocationModel,
        key: 'id',
      },
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: DeviceModel,
        key: 'id',
      },
    },
    receiver_employee_number: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: EmployeeModel,
        key: 'employee_number',
      },
    },
    approver_employee_number: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: EmployeeModel,
        key: 'employee_number',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
  },
  {
    modelName: 'responsive',
    sequelize,
    timestamps: false,
    createdAt: false,
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  }
)

ResponsiveModel.belongsTo(EmployeeModel, {
  foreignKey: {
    name: 'assigner_employee_number'
  },
  as: 'assigner',
})
ResponsiveModel.belongsTo(EmployeeModel, {
  foreignKey: 'receiver_employee_number',
  as: 'receiver',
})
ResponsiveModel.belongsTo(EmployeeModel, {
  foreignKey: 'approver_employee_number',
  as: 'approver',
})
ResponsiveModel.belongsTo(LocationModel, {
  foreignKey: 'location_id',
  as: 'location',
})
ResponsiveModel.belongsTo(DeviceModel, {
  foreignKey: 'device_id',
  as: 'device',
})
