/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CartaoModel } from '../entities/cartoes.entity';
import { CartaoDTO } from '../dto/cartoes.dto';

@Injectable()
export class CartaoRepository {

  constructor(
    @InjectModel(CartaoModel) private readonly cartaoModel: typeof CartaoModel ) {}

  criarCartao(cartao: CartaoDTO): Promise<CartaoModel> {
    return this.cartaoModel.create(cartao);
  }

  findOne(idCartao: number): Promise<CartaoModel> {
    return this.cartaoModel.findOne({
      where: {
        idCartao: idCartao
      }
    });
  }

  findAll(): Promise<CartaoModel[]> {
    return this.cartaoModel.findAll();
  }

  async remove(idCartao: number): Promise<void> {
    const cartao = await this.findOne(idCartao);
    if (cartao) {
      await cartao.destroy();
    } else {
      throw new NotFoundException(`ID ${idCartao} não encontrado`);
    }
  }

  async update(idCartao: number, cartaoDTO: CartaoDTO): Promise<CartaoModel> {
    const cartao = await this.findOne(idCartao);

    if (!cartao) {
      throw new NotFoundException(`ID ${idCartao} não encontrado`);
    }

    cartao.apelido = cartaoDTO.apelido ?? cartao.apelido;
    cartao.numero = cartaoDTO.numero ?? cartao.numero;
    cartao.validade = cartaoDTO.validade ?? cartao.validade;
    cartao.nome = cartaoDTO.nome ?? cartao.nome;
    cartao.codSeguranca = cartaoDTO.codSeguranca ?? cartao.codSeguranca;
    cartao.ativo = cartaoDTO.ativo ?? cartao.ativo;
    cartao.idUsuario = cartaoDTO.idUsuario ?? cartao.idUsuario;

    await cartao.save();

    return this.findOne(cartao.idCartao);
  }
}
