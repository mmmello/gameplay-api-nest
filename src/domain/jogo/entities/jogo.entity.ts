/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { FavoritoModel } from '../../favorito/entities/favorito.entity';
import { CategoriaModel } from '../../categoria/entities/categoria.entity';
import { IdiomaModel } from '../../idioma/entities/idioma.entity';
import { RequisitoModel } from '../../requisito/entities/requisito.entity';
import { HistoricoModel } from '../../historico/entities/historico.entity';

@Table({
  timestamps: false,
  tableName: "jogo",
  modelName: "JogoModel"
})
export class JogoModel extends Model<JogoModel> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idJogo: number;

  @Column({
    type: DataType.STRING(150),
  })
  nome: string;

  @Column({
    type: DataType.STRING(100),
  })
  imagem: string;

  @Column({
    type: DataType.SMALLINT,
  })
  classIndicativa: number;

  @Column({
    type: DataType.STRING(30),
  })
  classIndicativaConteudo: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  preco: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  promocao: number;

  @Column({
    type: DataType.STRING(500),
  })
  descricao: string;

  @Column({
    type: DataType.DATE,
  })
  lancamento: Date;

  @Column({
    type: DataType.STRING(150),
  })
  desenvolvedor: string;

  @Column({
    type: DataType.SMALLINT,
  })
  modos: number;

  @ForeignKey(() => CategoriaModel)
  @Column({
    type: DataType.INTEGER,
  })
  idCategoria: number;

  @BelongsTo(() => CategoriaModel)
  categoria: CategoriaModel;

  @HasMany(() => FavoritoModel)
  favoritos: FavoritoModel[];

  @HasMany(() => IdiomaModel)
  idiomas: IdiomaModel[];

  @HasMany(() => RequisitoModel)
  requisitos: RequisitoModel[];

  @HasMany(() => HistoricoModel)
  historicos: HistoricoModel[];
}
