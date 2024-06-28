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
import { HistoricoModel } from './entities/historico.entity';
import { HistoricoService } from './service/historico.service';
import { HistoricoDTO } from './dto/historico.dto';

@ApiTags('Historico')
@Controller('historico')
@UseGuards(AuthGuard)
export class HistoricoController {

    constructor(private readonly historicoService: HistoricoService) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: HistoricoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async criarHistorico(@Body() historico: HistoricoDTO): Promise<HistoricoModel> {
        return await this.historicoService.criarHistorico(historico);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<HistoricoModel[]> {
        return this.historicoService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idHistorico: number, @Res() response): Promise<void> {
        try {
            await this.historicoService.remove(idHistorico);
            return response.status(HttpStatus.OK).json({ message: `Registro com ID ${idHistorico} deletado com sucesso` });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: `ID ${idHistorico} não encontrado` });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: HistoricoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') idHistorico: number, @Body() historicoDTO: HistoricoDTO): Promise<HistoricoModel> {
        return await this.historicoService.update(idHistorico, historicoDTO);
    }
}
