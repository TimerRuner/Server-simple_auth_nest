import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../user/user.model";
import { Roles } from "./roles.model";

@Table({tableName: "UserRoles", createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @ForeignKey(() => Users)
  @Column({type: DataType.INTEGER, unique: true, allowNull: false})
  userId: number
  @ForeignKey(() => Roles)
  @Column({type: DataType.INTEGER, unique: true, allowNull: false})
  roleId: number
}