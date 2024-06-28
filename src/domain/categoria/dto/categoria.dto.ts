/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class CategoriaDTO {

  @IsString()
  nome: string;
}
