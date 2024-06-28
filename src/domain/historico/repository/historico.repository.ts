/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { HistoricoModel } from '../entities/historico.entity';
import { HistoricoDTO } from '../dto/historico.dto';

@Injectable()
export class HistoricoRepository {

  constructor(
    @InjectModel(HistoricoModel) private readonly historicoModel: typeof HistoricoModel ) {}

  criarHistorico(historico: HistoricoDTO): Promise<HistoricoModel> {
    return this.historicoModel.create(historico);
  }

  findOne(idHistorico: number): Promise<HistoricoModel> {
    return this.historicoModel.findOne({
      where: {
        idHistorico: idHistorico
      }
    });
  }

  findAll(): Promise<HistoricoModel[]> {
    return this.historicoModel.findAll();
  }

  async remove(idHistorico: number): Promise<void> {
    const historico = await this.findOne(idHistorico);
    if (historico) {
      await historico.destroy();
    } else {
      throw new NotFoundException(`ID ${idHistorico} não encontrado`);
    }
  }

  async update(idHistorico: number, historicoDTO: HistoricoDTO): Promise<HistoricoModel> {
    const historico = await this.findOne(idHistorico);

    if (!historico) {
      throw new NotFoundException(`ID ${idHistorico} não encontrado`);
    }

    historico.data = historicoDTO.data ?? historico.data;
    historico.voucher = historicoDTO.voucher ?? historico.voucher;
    historico.preco = historicoDTO.preco ?? historico.preco;
    historico.idUsuario = historicoDTO.idUsuario ?? historico.idUsuario;
    historico.idCartao = historicoDTO.idCartao ?? historico.idCartao;
    historico.idJogo = historicoDTO.idJogo ?? historico.idJogo;

    await historico.save();

    return this.findOne(historico.idHistorico);
  }
}
