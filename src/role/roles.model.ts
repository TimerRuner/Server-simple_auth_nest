import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Users } from "../user/user.model";
import { UserRoles } from "./user-roles.model";

interface IRolesDto {
  value: string
  description: string
}
@Table({tableName: "roles"})
export class Roles extends Model<Roles, IRolesDto> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  id: number
  @Column({type: DataType.STRING, unique: true, allowNull: false, defaultValue: false})
  value: string
  @Column({type: DataType.STRING, allowNull: true, defaultValue: false})
  description: string

  @BelongsToMany(() => Users, () => UserRoles)
  users: Users[]
}