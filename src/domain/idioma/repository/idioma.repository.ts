/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { IdiomaModel } from '../entities/idioma.entity';
import { IdiomaDTO } from '../dto/idioma.dto';

@Injectable()
export class IdiomaRepository {

  constructor(
    @InjectModel(IdiomaModel) private readonly idiomaModel: typeof IdiomaModel ) {}

  criarIdioma(idioma: IdiomaDTO): Promise<IdiomaModel> {
    return this.idiomaModel.create(idioma);
  }

  findOne(idIdioma: number): Promise<IdiomaModel> {
    return this.idiomaModel.findOne({
      where: {
        idIdioma: idIdioma
      }
    });
  }

  findAll(): Promise<IdiomaModel[]> {
    return this.idiomaModel.findAll();
  }

  async remove(idIdioma: number): Promise<void> {
    const idioma = await this.findOne(idIdioma);
    if (idioma) {
      await idioma.destroy();
    } else {
      throw new NotFoundException(`ID ${idIdioma} não encontrado`);
    }
  }

  async update(idIdioma: number, idiomaDTO: IdiomaDTO): Promise<IdiomaModel> {
    const idioma = await this.findOne(idIdioma);

    if (!idioma) {
      throw new NotFoundException(`ID ${idIdioma} não encontrado`);
    }

    idioma.tipo = idiomaDTO.tipo ?? idioma.tipo;
    idioma.alemao = idiomaDTO.alemao ?? idioma.alemao;
    idioma.ingles = idiomaDTO.ingles ?? idioma.ingles;
    idioma.espanhol = idiomaDTO.espanhol ?? idioma.espanhol;
    idioma.frances = idiomaDTO.frances ?? idioma.frances;
    idioma.japones = idiomaDTO.japones ?? idioma.japones;
    idioma.coreano = idiomaDTO.coreano ?? idioma.coreano;
    idioma.portugues = idiomaDTO.portugues ?? idioma.portugues;
    idioma.idJogo = idiomaDTO.idJogo ?? idioma.idJogo;

    await idioma.save();

    return this.findOne(idioma.idIdioma);
  }
}
