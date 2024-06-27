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
    Put,
    Res,
    HttpStatus,
    UseGuards
} from '@nestjs/common';

import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/guard/auth.guard';
import { EnderecoModel } from './entities/endereco.entity';
import { EnderecoService } from './service/endereco.service';

import { EnderecoDTO } from './dto/endereco.dto';

@ApiTags('Endereco')
@Controller('endereco')
@UseGuards(AuthGuard)
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
        return await this.enderecoService.criarEndereco(endereco)
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<EnderecoModel[]> {
      return this.enderecoService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idEndereco: number, @Res() response): Promise<void> {
      try{
            await this.enderecoService.remove(idEndereco);
            return response.status(HttpStatus.OK).json({message: `Registro com ID ${idEndereco} deletado com sucesso`})
        }catch (error){

            if(error instanceof NotFoundException){
                return response.status().json({message: `ID ${idEndereco} não encontrado`});
            }else{
                return response.status().json({message: error.message});
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: EnderecoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update( @Param('id') idEndereco: number, @Body() enderecoDTO: EnderecoDTO ): Promise<EnderecoModel> {
        return await this.enderecoService.update(idEndereco, enderecoDTO);
    }
}