/* eslint-disable prettier/prettier */
import { IsNumber, IsBoolean } from "class-validator";

export class IdiomaDTO {

  @IsNumber()
  tipo: number;

  @IsBoolean()
  alemao: boolean;

  @IsBoolean()
  ingles: boolean;

  @IsBoolean()
  espanhol: boolean;

  @IsBoolean()
  frances: boolean;

  @IsBoolean()
  japones: boolean;

  @IsBoolean()
  coreano: boolean;

  @IsBoolean()
  portugues: boolean;

  @IsNumber()
  idJogo: number;
}
