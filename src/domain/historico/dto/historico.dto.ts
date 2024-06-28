/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsDecimal, IsDate } from "class-validator";

export class HistoricoDTO {

  @IsNumber()
  idHistorico: number;

  @IsDate()
  data: Date;

  @IsString()
  voucher: string;

  @IsDecimal()
  preco: number;

  @IsNumber()
  idUsuario: number;

  @IsNumber()
  idCartao: number;

  @IsNumber()
  idJogo: number;
}
