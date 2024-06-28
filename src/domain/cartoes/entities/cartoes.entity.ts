/* eslint-disable prettier/prettier */
import { UsuarioModel } from '../../usuario/entities/usuario.entity';
import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: "cartoes",
  modelName: "CartaoModel"
})
export class CartaoModel extends Model<CartaoModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idCartao: number;

  @Column({
    type: DataType.STRING(20),
  })
  apelido: string;

  @Column({
    type: DataType.STRING(30),
  })
  numero: string;

  @Column({
    type: DataType.CHAR(5),
  })
  validade: string;

  @Column({
    type: DataType.STRING(150),
  })
  nome: string;

  @Column({
    type: DataType.INTEGER,
  })
  codSeguranca: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  ativo: boolean;

  @ForeignKey(() => UsuarioModel)
  @Column({
    type: DataType.INTEGER,
  })
  idUsuario: number;

  @BelongsTo(() => UsuarioModel)
  usuario: UsuarioModel;
}
