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
        return await this.enderecoRepository.findAll();
    }

    async criarEndereco(endereco: EnderecoDTO): Promise<EnderecoModel> {
    
        return await this.enderecoRepository.criarEndereco({
            ...endereco,
        });
    }

    async remove(idEndereco: number): Promise<void> {
        await this.enderecoRepository.remove(idEndereco);
    }

    async update(idEndereco: number, enderecoDTO: EnderecoDTO): Promise<EnderecoModel> {
        return await this.enderecoRepository.update(idEndereco, enderecoDTO);
    }
}