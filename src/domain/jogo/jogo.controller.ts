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
import { JogoModel } from './entities/jogo.entity';
import { JogoService } from './service/jogo.service';
import { JogoDTO } from './dto/jogo.dto';

@ApiTags('Jogo')
@Controller('jogo')
@UseGuards(AuthGuard)
export class JogoController {

    constructor(private readonly jogoService: JogoService) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: JogoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async criarJogo(@Body() jogo: JogoDTO): Promise<JogoModel> {
        return await this.jogoService.criarJogo(jogo);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<JogoModel[]> {
        return this.jogoService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idJogo: number, @Res() response): Promise<void> {
        try {
            await this.jogoService.remove(idJogo);
            return response.status(HttpStatus.OK).json({ message: `Registro com ID ${idJogo} deletado com sucesso` });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: `ID ${idJogo} não encontrado` });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: JogoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') idJogo: number, @Body() jogoDTO: JogoDTO): Promise<JogoModel> {
        return await this.jogoService.update(idJogo, jogoDTO);
    }
}
