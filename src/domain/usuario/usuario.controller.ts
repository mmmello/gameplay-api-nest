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
    UsePipes,
    Res,
    HttpStatus
} from '@nestjs/common';

import {
    ApiBadRequestResponse,
    ApiBody,
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
    @ApiBody({type : UsuarioDTO})
    async criarUsuario(@Body() usuario: UsuarioDTO): Promise<UsuarioModel>{
        return await this.usuarioService.criarUsuario(usuario);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<UsuarioModel[]> {
        return this.usuarioService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idUsuario: number, @Res() response): Promise<void> {
        try{
            await this.usuarioService.remove(idUsuario);
            return response.status(HttpStatus.OK).json({message: `Registro com ID ${idUsuario} deletado com sucesso`})
        }catch (error){

            if(error instanceof NotFoundException){
                return response.status().json({message: `ID ${idUsuario} não encontrado`});
            }else{
                return response.status().json({message: error.message});
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put('/:id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: UsuarioModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update( @Param('id') idUsuario: number, @Body() usuarioDTO: UsuarioDTO): Promise<UsuarioModel> {
        return await this.usuarioService.update(idUsuario, usuarioDTO);
    }
}