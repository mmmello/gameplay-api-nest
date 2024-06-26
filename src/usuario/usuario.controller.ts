/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Param,
    NotFoundException,
    Get,
    Post,
    Delete,
    Put,
    UseGuards,
    ValidationPipe,
    UsePipes
} from '@nestjs/common';

import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,

} from '@nestjs/swagger';

import { AuthGuard } from '../auth/guard/auth.guard';
import { UsuarioModel } from './entities/usuario.entity';
import { UsuarioService } from './service/usuario.service';

import { UsuarioDTO } from './dto/usuario.dto';

@ApiTags('Usuario')
@Controller('usuario')
@UseGuards(AuthGuard)
export class UsuarioController {

    constructor( private readonly usuarioService: UsuarioService ) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: UsuarioModel,
    })
    @ApiBadRequestResponse({  description: 'Bad Request'  })

    async criarUsuario(@Body() usuario: UsuarioDTO):Promise<UsuarioModel>{
        return this.usuarioService.criarUsuario(usuario)
    }

    @Get()
    findAll(): Promise<UsuarioModel[]> {
      return this.usuarioService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    remove(@Param('id') idUsuario: number): Promise<void> {
      return this.usuarioService.remove(idUsuario);
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: UsuarioModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })

    async update( @Param('id') idUsuario: number, @Body() usuarioDTO: UsuarioDTO, ): Promise<UsuarioModel> {

        try {
            return await this.usuarioService.update(idUsuario, usuarioDTO);

        } catch (error) {

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}