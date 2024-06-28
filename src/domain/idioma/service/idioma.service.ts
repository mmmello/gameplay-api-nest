/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IdiomaDTO } from '../dto/idioma.dto';
import { IdiomaModel } from '../entities/idioma.entity';
import { IdiomaRepository } from '../repository/idioma.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class IdiomaService {
    constructor(
        private readonly idiomaRepository: IdiomaRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<IdiomaModel[]> {
        return await this.idiomaRepository.findAll();
    }

    async criarIdioma(idioma: IdiomaDTO): Promise<IdiomaModel> {
        return await this.idiomaRepository.criarIdioma({
            ...idioma,
        });
    }

    async remove(idIdioma: number): Promise<void> {
        await this.idiomaRepository.remove(idIdioma);
    }

    async update(idIdioma: number, idiomaDTO: IdiomaDTO): Promise<IdiomaModel> {
        return await this.idiomaRepository.update(idIdioma, idiomaDTO);
    }
}
