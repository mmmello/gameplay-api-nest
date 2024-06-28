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
import { RequisitoModel } from './entities/requisito.entity';
import { RequisitoService } from './service/requisito.service';
import { RequisitoDTO } from './dto/requisito.dto';

@ApiTags('Requisito')
@Controller('requisito')
@UseGuards(AuthGuard)
export class RequisitoController {

    constructor(private readonly requisitoService: RequisitoService) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: RequisitoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async criarRequisito(@Body() requisito: RequisitoDTO): Promise<RequisitoModel> {
        return await this.requisitoService.criarRequisito(requisito);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<RequisitoModel[]> {
        return this.requisitoService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idRequisito: number, @Res() response): Promise<void> {
        try {
            await this.requisitoService.remove(idRequisito);
            return response.status(HttpStatus.OK).json({ message: `Registro com ID ${idRequisito} deletado com sucesso` });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: `ID ${idRequisito} não encontrado` });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: RequisitoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') idRequisito: number, @Body() requisitoDTO: RequisitoDTO): Promise<RequisitoModel> {
        return await this.requisitoService.update(idRequisito, requisitoDTO);
    }
}
