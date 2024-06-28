/* eslint-disable prettier/prettier */
import { IsNumber } from "class-validator";

export class FavoritoDTO {

  @IsNumber()
  idUsuario: number;

  @IsNumber()
  idJogo: number;
}
