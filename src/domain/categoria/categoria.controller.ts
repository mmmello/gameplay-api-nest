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
import { CategoriaModel } from './entities/categoria.entity';
import { CategoriaService } from './service/categoria.service';
import { CategoriaDTO } from './dto/categoria.dto';

@ApiTags('Categoria')
@Controller('categoria')
@UseGuards(AuthGuard)
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: CategoriaModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async criarCategoria(@Body() categoria: CategoriaDTO): Promise<CategoriaModel> {
        return await this.categoriaService.criarCategoria(categoria);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<CategoriaModel[]> {
        return this.categoriaService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idCategoria: number, @Res() response): Promise<void> {
        try {
            await this.categoriaService.remove(idCategoria);
            return response.status(HttpStatus.OK).json({ message: `Registro com ID ${idCategoria} deletado com sucesso` });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: `ID ${idCategoria} não encontrado` });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: CategoriaModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') idCategoria: number, @Body() categoriaDTO: CategoriaDTO): Promise<CategoriaModel> {
        return await this.categoriaService.update(idCategoria, categoriaDTO);
    }
}
