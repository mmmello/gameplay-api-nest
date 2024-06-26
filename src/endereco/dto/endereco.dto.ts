/* eslint-disable prettier/prettier */
import { EnderecoModel }  from '../entities/endereco.entity';
import { IsNumber, IsString } from "class-validator";

export class EnderecoDTO {
  
  @IsNumber()
  idEndereco: number;

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

  constructor(endereco: EnderecoModel) {
    this.idEndereco = endereco.idEndereco;
    this.numero = endereco.numero;
    this.rua = endereco.rua;
    this.bairro = endereco.bairro;
    this.cidade = endereco.cidade;
    this.estado = endereco.estado;
    this.pais = endereco.pais;
    this.idUsuario = endereco.idUsuario;
  }
}
