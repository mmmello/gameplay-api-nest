/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsDate } from "class-validator";

export class HistoricoDTO {

  @IsDate()
  data: Date;

  @IsString()
  voucher: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  idUsuario: number;

  @IsNumber()
  idCartao: number;

  @IsNumber()
  idJogo: number;
}
