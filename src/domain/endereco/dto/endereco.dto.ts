/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
 
export class EnderecoDTO {

  @IsNumber()
  numero: number;

  @IsString()
  rua: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  pais: string;

  @IsNumber()
  idUsuario: number;
}
