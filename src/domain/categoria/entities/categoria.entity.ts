/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: "categoria",
  modelName: "CategoriaModel"
})
export class CategoriaModel extends Model<CategoriaModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idCategoria: number;

  @Column({
    type: DataType.STRING(30),
  })
  nome: string;
}
