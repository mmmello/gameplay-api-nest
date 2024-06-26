/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { EnderecoDTO } from '../dto/endereco.dto';
import { EnderecoModel } from '../entities/endereco.entity';
import { EnderecoRepository } from '../repository/endereco.repository';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class EnderecoService {
    constructor(
        private readonly enderecoRepository: EnderecoRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<EnderecoModel[]> {

        const cacheKey = `endereco_`;
        const cachedValue = await this.cacheManager.get<EnderecoModel[]>(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const enderecos = await this.enderecoRepository.findAll();
        await this.cacheManager.set(cacheKey, enderecos, { ttl: 10 });

        return enderecos;
    }

    async criarEndereco(endereco: EnderecoDTO): Promise<EnderecoModel> {
    
        return this.enderecoRepository.criarEndereco({
            ...endereco,
        });
    }

    async remove(idEndereco: number): Promise<void> {
        await this.enderecoRepository.remove(idEndereco);
    }

    async update(idEndereco: number, enderecoDTO: EnderecoDTO): Promise<EnderecoModel> {
        const endereco = await this.enderecoRepository.update(idEndereco, enderecoDTO);
      
        return endereco;
    }
}