/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsBoolean } from "class-validator";

export class CartaoDTO {

  @IsString()
  apelido: string;

  @IsString()
  numero: string;

  @IsString()
  validade: string;

  @IsString()
  nome: string;

  @IsNumber()
  codSeguranca: number;

  @IsBoolean()
  ativo: boolean;

  @IsNumber()
  idUsuario: number;
}
