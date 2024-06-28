/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException }    from '@nestjs/common';
import { InjectModel }                      from '@nestjs/sequelize';

import { EnderecoModel }                     from '../entities/endereco.entity';
import { EnderecoDTO }                       from '../dto/endereco.dto';

@Injectable()
export class EnderecoRepository {

  constructor(

    @InjectModel(EnderecoModel) private readonly enderecoModel: typeof EnderecoModel ) {}

    criarEndereco(endereco: EnderecoDTO): Promise<EnderecoModel> {
        return this.enderecoModel.create(endereco);
    }

    findOne(idEndereco: number): Promise<EnderecoModel> {
        return this.enderecoModel.findOne({
            where: {
                idEndereco: idEndereco
            }
        });
    }

    findAll(): Promise<EnderecoModel[]> {
        return this.enderecoModel.findAll();
    }

    async remove(idEndereco: number): Promise<void> {
        const endereco = await this.findOne(idEndereco);
        if (endereco) {
            await endereco.destroy();
        } else {
            throw new NotFoundException(`ID ${idEndereco} não encontrado`);
        }
    }

    async update(idEndereco: number, enderecoDTO: EnderecoDTO): Promise<EnderecoModel> {
        const endereco = await this.findOne(idEndereco);

        if (!endereco) {
            throw new NotFoundException(`ID ${idEndereco} não encontrado`);
        }

        endereco.numero = enderecoDTO.numero  ?? endereco.numero;
        endereco.rua    = enderecoDTO.rua     ?? endereco.rua;
        endereco.bairro = enderecoDTO.bairro  ?? endereco.bairro;
        endereco.cidade = enderecoDTO.cidade  ?? endereco.cidade;
        endereco.estado = enderecoDTO.estado  ?? endereco.estado;
        endereco.pais   = enderecoDTO.pais    ?? endereco.pais;
    
        await endereco.save();

        return this.findOne(endereco.idEndereco);
    }
}
