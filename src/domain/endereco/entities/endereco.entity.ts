/* eslint-disable prettier/prettier */
import { UsuarioModel } from '../../usuario/entities/usuario.entity';
import { Table, Column, Model, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';

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
    type: DataType.NUMBER,
  })
  numero: number;

  @Column({
    type: DataType.TEXT,
  })
  rua: string;

  @Column({
    type: DataType.TEXT,
  })
  bairro: string;

  @Column({
    type: DataType.TEXT,
  })
  cidade: string;

  @Column({
    type: DataType.TEXT,
  })
  estado: string;

  @Column({
    type: DataType.TEXT,
  })
  pais: string;

  @ForeignKey(() => UsuarioModel)
  @Column
  idUsuario: number;

  @BelongsTo(() => UsuarioModel)
  usuario: UsuarioModel;
}
