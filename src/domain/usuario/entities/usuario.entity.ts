/* eslint-disable prettier/prettier */
import { EnderecoModel } from '../../endereco/entities/endereco.entity';
import { Table, Column, Model, DataType, HasOne} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: "usuario",
  modelName: "UsuarioModel"
})
export class UsuarioModel extends Model<UsuarioModel> {

  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  })
  idUsuario: number;

  @Column({
    type: DataType.STRING,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  senha: string;

  @Column({
    type: DataType.STRING,
  })
  telefone: string;

  @Column({
    type: DataType.STRING,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @HasOne(() => EnderecoModel)
  idEndereco: EnderecoModel;
}
