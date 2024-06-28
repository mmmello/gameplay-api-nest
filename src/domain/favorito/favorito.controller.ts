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
import { FavoritoModel } from './entities/favorito.entity';
import { FavoritoService } from './service/favorito.service';
import { FavoritoDTO } from './dto/favorito.dto';

@ApiTags('Favorito')
@Controller('favorito')
@UseGuards(AuthGuard)
export class FavoritoController {

    constructor(private readonly favoritoService: FavoritoService) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: FavoritoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async criarFavorito(@Body() favorito: FavoritoDTO): Promise<FavoritoModel> {
        return await this.favoritoService.criarFavorito(favorito);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<FavoritoModel[]> {
        return this.favoritoService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':idUsuario/:idJogo')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('idUsuario') idUsuario: number, @Param('idJogo') idJogo: number, @Res() response): Promise<void> {
        try {
            await this.favoritoService.remove(idUsuario, idJogo);
            return response.status(HttpStatus.OK).json({ message: `Registro com ID Usuario ${idUsuario} e ID Jogo ${idJogo} deletado com sucesso` });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: `ID Usuario ${idUsuario} e/ou ID Jogo ${idJogo} não encontrado(s)` });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':idUsuario/:idJogo')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: FavoritoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('idUsuario') idUsuario: number, @Param('idJogo') idJogo: number, @Body() favoritoDTO: FavoritoDTO): Promise<FavoritoModel> {
        return await this.favoritoService.update(idUsuario, idJogo, favoritoDTO);
    }
}
