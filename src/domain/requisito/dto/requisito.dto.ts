/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class RequisitoDTO {

  @IsNumber()
  tipo: number;

  @IsString()
  sistema: string;

  @IsString()
  versoes: string;

  @IsString()
  armazenamento: string;

  @IsString()
  processador: string;

  @IsString()
  memoria: string;

  @IsString()
  placaVideo: string;

  @IsNumber()
  idJogo: number;
}
