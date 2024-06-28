/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CategoriaModel } from '../entities/categoria.entity';
import { CategoriaDTO } from '../dto/categoria.dto';

@Injectable()
export class CategoriaRepository {

  constructor(
    @InjectModel(CategoriaModel) private readonly categoriaModel: typeof CategoriaModel ) {}

  criarCategoria(categoria: CategoriaDTO): Promise<CategoriaModel> {
    return this.categoriaModel.create(categoria);
  }

  findOne(idCategoria: number): Promise<CategoriaModel> {
    return this.categoriaModel.findOne({
      where: {
        idCategoria: idCategoria
      }
    });
  }

  findAll(): Promise<CategoriaModel[]> {
    return this.categoriaModel.findAll();
  }

  async remove(idCategoria: number): Promise<void> {
    const categoria = await this.findOne(idCategoria);
    if (categoria) {
      await categoria.destroy();
    } else {
      throw new NotFoundException(`ID ${idCategoria} não encontrado`);
    }
  }

  async update(idCategoria: number, categoriaDTO: CategoriaDTO): Promise<CategoriaModel> {
    const categoria = await this.findOne(idCategoria);

    if (!categoria) {
      throw new NotFoundException(`ID ${idCategoria} não encontrado`);
    }

    categoria.nome = categoriaDTO.nome ?? categoria.nome;

    await categoria.save();

    return this.findOne(categoria.idCategoria);
  }
}
