/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioDTO } from '../dto/usuario.dto';
import { UsuarioModel } from '../entities/usuario.entity';
import { UsuarioRepository } from '../repository/usuario.repository';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        @Inject(CACHE_MANAGER) private cacheManager: CacheStore
    ) {}

    async findAll(): Promise<UsuarioModel[]> {

        const cacheKey = `usuario_`;
        const cachedValue = await this.cacheManager.get<UsuarioModel[]>(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const usuarios = await this.usuarioRepository.findAll();
        await this.cacheManager.set(cacheKey, usuarios, { ttl: 10 });

        return usuarios;
    }

    async updateCache(): Promise<void> {

        const cacheKey = `usuario_`;

        const usuarios = await this.usuarioRepository.findAll();
        await this.cacheManager.set(cacheKey, usuarios, { ttl: 10 });
    }

    async criarUsuario(usuarioDTO: UsuarioDTO): Promise<UsuarioModel> {
        const hashedPassword = await bcrypt.hash(usuarioDTO.senha, 10);

        const retorno = await this.usuarioRepository.criarUsuario({
            ...usuarioDTO,
            senha: hashedPassword
        });

        await this.updateCache();
        return retorno;
    }

    async remove(idUsuario: number): Promise<void> {

        await this.usuarioRepository.remove(idUsuario);
        await this.updateCache();
    }

    async update(idUsuario: number, usuarioDTO: UsuarioDTO): Promise<UsuarioModel> {
        const hashedPassword = await bcrypt.hash(usuarioDTO.senha, 10);

        const retorno = await this.usuarioRepository.update(idUsuario, {
            ...usuarioDTO,
            senha: hashedPassword
        });
      
        await this.updateCache();
        return retorno;
    }

    async findOneByEmail(email: string): Promise<UsuarioModel> {
        return this.usuarioRepository.findOneByEmail(email);
    }
}