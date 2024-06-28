/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UsuarioModel } from '../../usuario/entities/usuario.entity';
import { JogoModel } from '../../jogo/entities/jogo.entity';
import { CartaoModel } from '../../cartoes/entities/cartoes.entity';

@Table({
  timestamps: false,
  tableName: "historico",
  modelName: "HistoricoModel"
})
export class HistoricoModel extends Model<HistoricoModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idHistorico: number;

  @Column({
    type: DataType.DATE,
  })
  data: Date;

  @Column({
    type: DataType.CHAR(17),
  })
  voucher: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  preco: number;

  @ForeignKey(() => UsuarioModel)
  @Column({
    type: DataType.INTEGER,
  })
  idUsuario: number;

  @ForeignKey(() => CartaoModel)
  @Column({
    type: DataType.INTEGER,
  })
  idCartao: number;

  @ForeignKey(() => JogoModel)
  @Column({
    type: DataType.INTEGER,
  })
  idJogo: number;

  @BelongsTo(() => UsuarioModel)
  usuario: UsuarioModel;

  @BelongsTo(() => CartaoModel)
  cartao: CartaoModel;

  @BelongsTo(() => JogoModel)
  jogo: JogoModel;
}
