/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsDecimal, IsDate } from "class-validator";

export class JogoDTO {

  @IsNumber()
  idJogo: number;

  @IsString()
  nome: string;

  @IsString()
  imagem: string;

  @IsNumber()
  classIndicativa: number;

  @IsString()
  classIndicativaConteudo: string;

  @IsDecimal()
  preco: number;

  @IsDecimal()
  promocao: number;

  @IsString()
  descricao: string;

  @IsDate()
  lancamento: Date;

  @IsString()
  desenvolvedor: string;

  @IsNumber()
  modos: number;

  @IsNumber()
  idCategoria: number;
}
