/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CategoriaDTO } from '../dto/categoria.dto';
import { CategoriaModel } from '../entities/categoria.entity';
import { CategoriaRepository } from '../repository/categorias.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class CategoriaService {
    constructor(
        private readonly categoriaRepository: CategoriaRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<CategoriaModel[]> {
        return await this.categoriaRepository.findAll();
    }

    async criarCategoria(categoria: CategoriaDTO): Promise<CategoriaModel> {
        return await this.categoriaRepository.criarCategoria({
            ...categoria,
        });
    }

    async remove(idCategoria: number): Promise<void> {
        await this.categoriaRepository.remove(idCategoria);
    }

    async update(idCategoria: number, categoriaDTO: CategoriaDTO): Promise<CategoriaModel> {
        return await this.categoriaRepository.update(idCategoria, categoriaDTO);
    }
}
