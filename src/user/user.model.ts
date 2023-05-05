import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Roles } from "../role/roles.model";
import { UserRoles } from "../role/user-roles.model";

interface IUserDto {
  email: string;
  password: string;
}
@Table({tableName: "users"})
export class Users extends Model<Users, IUserDto> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  id: number
  @Column({type: DataType.STRING, unique: true, allowNull: false, defaultValue: false})
  email: string
  @Column({type: DataType.STRING, allowNull: false, defaultValue: false})
  password: string

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[]
}