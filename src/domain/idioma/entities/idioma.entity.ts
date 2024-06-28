/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { JogoModel } from '../../jogo/entities/jogo.entity';

@Table({
  timestamps: false,
  tableName: "idiomas",
  modelName: "IdiomaModel"
})
export class IdiomaModel extends Model<IdiomaModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idIdioma: number;

  @Column({
    type: DataType.SMALLINT,
  })
  tipo: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  alemao: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  ingles: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  espanhol: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  frances: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  japones: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  coreano: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  portugues: boolean;

  @ForeignKey(() => JogoModel)
  @Column({
    type: DataType.INTEGER,
  })
  idJogo: number;

  @BelongsTo(() => JogoModel)
  jogo: JogoModel;
}
