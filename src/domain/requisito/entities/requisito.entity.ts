/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { JogoModel } from '../../jogo/entities/jogo.entity';

@Table({
  timestamps: false,
  tableName: "requisitos",
  modelName: "RequisitoModel"
})
export class RequisitoModel extends Model<RequisitoModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idRequisito: number;

  @Column({
    type: DataType.TINYINT,
  })
  tipo: number;

  @Column({
    type: DataType.STRING(30),
  })
  sistema: string;

  @Column({
    type: DataType.STRING(100),
  })
  versoes: string;

  @Column({
    type: DataType.STRING(20),
  })
  armazenamento: string;

  @Column({
    type: DataType.STRING(100),
  })
  processador: string;

  @Column({
    type: DataType.STRING(30),
  })
  memoria: string;

  @Column({
    type: DataType.STRING(100),
  })
  placaVideo: string;

  @ForeignKey(() => JogoModel)
  @Column({
    type: DataType.INTEGER,
  })
  idJogo: number;

  @BelongsTo(() => JogoModel)
  jogo: JogoModel;
}
