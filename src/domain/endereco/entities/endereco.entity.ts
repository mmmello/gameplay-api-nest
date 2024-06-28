/* eslint-disable prettier/prettier */
import { UsuarioModel } from '../../usuario/entities/usuario.entity';
import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: "endereco",
  modelName: "EnderecoModel"
})
export class EnderecoModel extends Model<EnderecoModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idEndereco: number;

  @Column({
    type: DataType.INTEGER,
  })
  numero: number;

  @Column({
    type: DataType.STRING(150),
  })
  rua: string;

  @Column({
    type: DataType.STRING(50),
  })
  bairro: string;

  @Column({
    type: DataType.STRING(50),
  })
  cidade: string;

  @Column({
    type: DataType.STRING(50),
  })
  estado: string;

  @Column({
    type: DataType.STRING(50),
  })
  pais: string;

  @ForeignKey(() => UsuarioModel)
  @Column({
    type: DataType.INTEGER,
  })
  idUsuario: number;

  @BelongsTo(() => UsuarioModel)
  usuario: UsuarioModel;
}
