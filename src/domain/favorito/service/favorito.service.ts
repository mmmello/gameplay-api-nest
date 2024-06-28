/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { FavoritoDTO } from '../dto/favorito.dto';
import { FavoritoModel } from '../entities/favorito.entity';
import { FavoritoRepository } from '../repository/favorito.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class FavoritoService {
    constructor(
        private readonly favoritoRepository: FavoritoRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<FavoritoModel[]> {
        return await this.favoritoRepository.findAll();
    }

    async criarFavorito(favorito: FavoritoDTO): Promise<FavoritoModel> {
        return await this.favoritoRepository.criarFavorito({
            ...favorito,
        });
    }

    async remove(idUsuario: number, idJogo: number): Promise<void> {
        await this.favoritoRepository.remove(idUsuario, idJogo);
    }

    async update(idUsuario: number, idJogo: number, favoritoDTO: FavoritoDTO): Promise<FavoritoModel> {
        return await this.favoritoRepository.update(idUsuario, idJogo, favoritoDTO);
    }
}
