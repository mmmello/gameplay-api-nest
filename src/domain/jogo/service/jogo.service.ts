/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { JogoDTO } from '../dto/jogo.dto';
import { JogoModel } from '../entities/jogo.entity';
import { JogoRepository } from '../repository/jogo.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class JogoService {
    constructor(
        private readonly jogoRepository: JogoRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<JogoModel[]> {
        return await this.jogoRepository.findAll();
    }

    async criarJogo(jogo: JogoDTO): Promise<JogoModel> {
        return await this.jogoRepository.criarJogo({
            ...jogo,
        });
    }

    async remove(idJogo: number): Promise<void> {
        await this.jogoRepository.remove(idJogo);
    }

    async update(idJogo: number, jogoDTO: JogoDTO): Promise<JogoModel> {
        return await this.jogoRepository.update(idJogo, jogoDTO);
    }
}
