/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RequisitoModel } from '../entities/requisito.entity';
import { RequisitoDTO } from '../dto/requisito.dto';

@Injectable()
export class RequisitoRepository {

  constructor(
    @InjectModel(RequisitoModel) private readonly requisitoModel: typeof RequisitoModel ) {}

  criarRequisito(requisito: RequisitoDTO): Promise<RequisitoModel> {
    return this.requisitoModel.create(requisito);
  }

  findOne(idRequisito: number): Promise<RequisitoModel> {
    return this.requisitoModel.findOne({
      where: {
        idRequisito: idRequisito
      }
    });
  }

  findAll(): Promise<RequisitoModel[]> {
    return this.requisitoModel.findAll();
  }

  async remove(idRequisito: number): Promise<void> {
    const requisito = await this.findOne(idRequisito);
    if (requisito) {
      await requisito.destroy();
    } else {
      throw new NotFoundException(`ID ${idRequisito} não encontrado`);
    }
  }

  async update(idRequisito: number, requisitoDTO: RequisitoDTO): Promise<RequisitoModel> {
    const requisito = await this.findOne(idRequisito);

    if (!requisito) {
      throw new NotFoundException(`ID ${idRequisito} não encontrado`);
    }

    requisito.tipo = requisitoDTO.tipo ?? requisito.tipo;
    requisito.sistema = requisitoDTO.sistema ?? requisito.sistema;
    requisito.versoes = requisitoDTO.versoes ?? requisito.versoes;
    requisito.armazenamento = requisitoDTO.armazenamento ?? requisito.armazenamento;
    requisito.processador = requisitoDTO.processador ?? requisito.processador;
    requisito.memoria = requisitoDTO.memoria ?? requisito.memoria;
    requisito.placaVideo = requisitoDTO.placaVideo ?? requisito.placaVideo;
    requisito.idJogo = requisitoDTO.idJogo ?? requisito.idJogo;

    await requisito.save();

    return this.findOne(requisito.idRequisito);
  }
}
