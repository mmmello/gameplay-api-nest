/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsDate } from "class-validator";

export class JogoDTO {

  @IsString()
  nome: string;

  @IsString()
  imagem: string;

  @IsNumber()
  classIndicativa: number;

  @IsString()
  classIndicativaConteudo: string;

  @IsNumber()
  preco: number;

  @IsNumber()
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
