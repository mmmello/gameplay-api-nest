/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FavoritoModel } from '../entities/favorito.entity';
import { FavoritoDTO } from '../dto/favorito.dto';

@Injectable()
export class FavoritoRepository {

  constructor(
    @InjectModel(FavoritoModel) private readonly favoritoModel: typeof FavoritoModel ) {}

  criarFavorito(favorito: FavoritoDTO): Promise<FavoritoModel> {
    return this.favoritoModel.create(favorito);
  }

  findOne(idUsuario: number, idJogo: number): Promise<FavoritoModel> {
    return this.favoritoModel.findOne({
      where: {
        idUsuario: idUsuario,
        idJogo: idJogo
      }
    });
  }

  findAll(): Promise<FavoritoModel[]> {
    return this.favoritoModel.findAll();
  }

  async remove(idUsuario: number, idJogo: number): Promise<void> {
    const favorito = await this.findOne(idUsuario, idJogo);
    if (favorito) {
      await favorito.destroy();
    } else {
      throw new NotFoundException(`Favorito não encontrado para o usuário ID ${idUsuario} e jogo ID ${idJogo}`);
    }
  }

  async update(idUsuario: number, idJogo: number, favoritoDTO: FavoritoDTO): Promise<FavoritoModel> {
    const favorito = await this.findOne(idUsuario, idJogo);

    if (!favorito) {
      throw new NotFoundException(`Favorito não encontrado para o usuário ID ${idUsuario} e jogo ID ${idJogo}`);
    }

    favorito.idUsuario = favoritoDTO.idUsuario ?? favorito.idUsuario;
    favorito.idJogo = favoritoDTO.idJogo ?? favorito.idJogo;

    await favorito.save();

    return this.findOne(favorito.idUsuario, favorito.idJogo);
  }
}
