/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CartaoDTO } from '../dto/cartoes.dto';
import { CartaoModel } from '../entities/cartoes.entity';
import { CartaoRepository } from '../repository/cartoes.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class CartaoService {
    constructor(
        private readonly cartaoRepository: CartaoRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<CartaoModel[]> {
        return await this.cartaoRepository.findAll();
    }

    async criarCartao(cartao: CartaoDTO): Promise<CartaoModel> {
        return await this.cartaoRepository.criarCartao({
            ...cartao,
        });
    }

    async remove(idCartao: number): Promise<void> {
        await this.cartaoRepository.remove(idCartao);
    }

    async update(idCartao: number, cartaoDTO: CartaoDTO): Promise<CartaoModel> {
        return await this.cartaoRepository.update(idCartao, cartaoDTO);
    }
}
