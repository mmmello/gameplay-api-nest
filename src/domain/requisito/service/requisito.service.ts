/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { RequisitoDTO } from '../dto/requisito.dto';
import { RequisitoModel } from '../entities/requisito.entity';
import { RequisitoRepository } from '../repository/requisito.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class RequisitoService {
    constructor(
        private readonly requisitoRepository: RequisitoRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<RequisitoModel[]> {
        return await this.requisitoRepository.findAll();
    }

    async criarRequisito(requisito: RequisitoDTO): Promise<RequisitoModel> {
        return await this.requisitoRepository.criarRequisito({
            ...requisito,
        });
    }

    async remove(idRequisito: number): Promise<void> {
        await this.requisitoRepository.remove(idRequisito);
    }

    async update(idRequisito: number, requisitoDTO: RequisitoDTO): Promise<RequisitoModel> {
        return await this.requisitoRepository.update(idRequisito, requisitoDTO);
    }
}
