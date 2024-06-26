/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Param,
    UsePipes,
    ValidationPipe,
    NotFoundException,
    Get,
    Post,
    Delete,
    Put
} from '@nestjs/common';

import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { EnderecoModel } from './entities/endereco.entity';
import { EnderecoService } from './service/endereco.service';

import { EnderecoDTO } from './dto/endereco.dto';

@ApiTags('Endereco')
@Controller('endereco')
export class EnderecoController {

    constructor( private readonly enderecoService: EnderecoService ) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: EnderecoModel,
    })
    @ApiBadRequestResponse({  description: 'Bad Request'  })

    async criarEndereco(@Body() endereco: EnderecoDTO):Promise<EnderecoModel>{
        return this.enderecoService.criarEndereco(endereco)
    }

    @Get()
    findAll(): Promise<EnderecoModel[]> {
      return this.enderecoService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    remove(@Param('id') idEndereco: number): Promise<void> {
      return this.enderecoService.remove(idEndereco);
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: EnderecoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })

    async update( @Param('id') idEndereco: number, @Body() enderecoDTO: EnderecoDTO, ): Promise<EnderecoModel> {

        try {
            return await this.enderecoService.update(idEndereco, enderecoDTO);

        } catch (error) {

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}