/* eslint-disable prettier/prettier */
import { EnderecoModel } from '../../endereco/entities/endereco.entity';
import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { FavoritoModel } from '../../favorito/entities/favorito.entity';
import { HistoricoModel } from '../../historico/entities/historico.entity';
import { CartaoModel } from '../../cartoes/entities/cartoes.entity';

@Table({
  timestamps: false,
  tableName: "usuario",
  modelName: "UsuarioModel"
})
export class UsuarioModel extends Model<UsuarioModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idUsuario: number;

  @Column({
    type: DataType.STRING(150),
  })
  nome: string;

  @Column({
    type: DataType.STRING(50),
  })
  email: string;

  @Column({
    type: DataType.STRING(60),
  })
  senha: string;

  @Column({
    type: DataType.CHAR(16),
  })
  telefone: string;

  @Column({
    type: DataType.CHAR(14),
  })
  cpf: string;

  @Column({
    type: DataType.STRING(40),
  })
  avatar: string;

  @HasOne(() => EnderecoModel)
  endereco: EnderecoModel;

  @HasMany(() => FavoritoModel)
  favoritos: FavoritoModel[];

  @HasMany(() => HistoricoModel)
  historicos: HistoricoModel[];

  @HasMany(() => CartaoModel)
  cartoes: CartaoModel[];
}
