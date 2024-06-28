/* eslint-disable prettier/prettier */
import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UsuarioModel } from '../../usuario/entities/usuario.entity';
import { JogoModel } from '../../jogo/entities/jogo.entity';

@Table({
  timestamps: false,
  tableName: "Favoritos",
  modelName: "FavoritoModel"
})
export class FavoritoModel extends Model<FavoritoModel> {

  @ForeignKey(() => UsuarioModel)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  idUsuario: number;

  @ForeignKey(() => JogoModel)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  idJogo: number;

  @BelongsTo(() => UsuarioModel)
  usuario: UsuarioModel;

  @BelongsTo(() => JogoModel)
  jogo: JogoModel;
}
