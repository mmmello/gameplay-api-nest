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
import { IdiomaModel } from './entities/idioma.entity';
import { IdiomaService } from './service/idioma.service';
import { IdiomaDTO } from './dto/idioma.dto';

@ApiTags('Idioma')
@Controller('idioma')
@UseGuards(AuthGuard)
export class IdiomaController {

    constructor(private readonly idiomaService: IdiomaService) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: IdiomaModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async criarIdioma(@Body() idioma: IdiomaDTO): Promise<IdiomaModel> {
        return await this.idiomaService.criarIdioma(idioma);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<IdiomaModel[]> {
        return this.idiomaService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idIdioma: number, @Res() response): Promise<void> {
        try {
            await this.idiomaService.remove(idIdioma);
            return response.status(HttpStatus.OK).json({ message: `Registro com ID ${idIdioma} deletado com sucesso` });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: `ID ${idIdioma} não encontrado` });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: IdiomaModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') idIdioma: number, @Body() idiomaDTO: IdiomaDTO): Promise<IdiomaModel> {
        return await this.idiomaService.update(idIdioma, idiomaDTO);
    }
}
