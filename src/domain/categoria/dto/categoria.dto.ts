/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class CategoriaDTO {

  @IsNumber()
  idCategoria: number;

  @IsString()
  nome: string;
}
