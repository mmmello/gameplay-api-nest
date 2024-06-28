/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { HistoricoDTO } from '../dto/historico.dto';
import { HistoricoModel } from '../entities/historico.entity';
import { HistoricoRepository } from '../repository/historico.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class HistoricoService {
    constructor(
        private readonly historicoRepository: HistoricoRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<HistoricoModel[]> {
        return await this.historicoRepository.findAll();
    }

    async criarHistorico(historico: HistoricoDTO): Promise<HistoricoModel> {
        return await this.historicoRepository.criarHistorico({
            ...historico,
        });
    }

    async remove(idHistorico: number): Promise<void> {
        await this.historicoRepository.remove(idHistorico);
    }

    async update(idHistorico: number, historicoDTO: HistoricoDTO): Promise<HistoricoModel> {
        return await this.historicoRepository.update(idHistorico, historicoDTO);
    }
}
