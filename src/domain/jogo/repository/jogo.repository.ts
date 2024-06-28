/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { JogoModel } from '../entities/jogo.entity';
import { JogoDTO } from '../dto/jogo.dto';

@Injectable()
export class JogoRepository {

  constructor(
    @InjectModel(JogoModel) private readonly jogoModel: typeof JogoModel ) {}

  criarJogo(jogo: JogoDTO): Promise<JogoModel> {
    return this.jogoModel.create(jogo);
  }

  findOne(idJogo: number): Promise<JogoModel> {
    return this.jogoModel.findOne({
      where: {
        idJogo: idJogo
      }
    });
  }

  findAll(): Promise<JogoModel[]> {
    return this.jogoModel.findAll();
  }

  async remove(idJogo: number): Promise<void> {
    const jogo = await this.findOne(idJogo);
    if (jogo) {
      await jogo.destroy();
    } else {
      throw new NotFoundException(`ID ${idJogo} não encontrado`);
    }
  }

  async update(idJogo: number, jogoDTO: JogoDTO): Promise<JogoModel> {
    const jogo = await this.findOne(idJogo);

    if (!jogo) {
      throw new NotFoundException(`ID ${idJogo} não encontrado`);
    }

    jogo.nome = jogoDTO.nome ?? jogo.nome;
    jogo.imagem = jogoDTO.imagem ?? jogo.imagem;
    jogo.classIndicativa = jogoDTO.classIndicativa ?? jogo.classIndicativa;
    jogo.classIndicativaConteudo = jogoDTO.classIndicativaConteudo ?? jogo.classIndicativaConteudo;
    jogo.preco = jogoDTO.preco ?? jogo.preco;
    jogo.promocao = jogoDTO.promocao ?? jogo.promocao;
    jogo.descricao = jogoDTO.descricao ?? jogo.descricao;
    jogo.lancamento = jogoDTO.lancamento ?? jogo.lancamento;
    jogo.desenvolvedor = jogoDTO.desenvolvedor ?? jogo.desenvolvedor;
    jogo.modos = jogoDTO.modos ?? jogo.modos;
    jogo.idCategoria = jogoDTO.idCategoria ?? jogo.idCategoria;

    await jogo.save();

    return this.findOne(jogo.idJogo);
  }
}
