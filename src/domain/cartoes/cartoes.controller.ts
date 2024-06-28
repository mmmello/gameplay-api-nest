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
import { CartaoModel } from './entities/cartoes.entity';
import { CartaoService } from './service/cartoes.service';
import { CartaoDTO } from './dto/cartoes.dto';

@ApiTags('Cartao')
@Controller('cartao')
@UseGuards(AuthGuard)
export class CartaoController {

    constructor(private readonly cartaoService: CartaoService) {}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiCreatedResponse({
        description: 'Registro criado com sucesso',
        type: CartaoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async criarCartao(@Body() cartao: CartaoDTO): Promise<CartaoModel> {
        return await this.cartaoService.criarCartao(cartao);
    }

    @UsePipes(ValidationPipe)
    @Get()
    findAll(): Promise<CartaoModel[]> {
        return this.cartaoService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async remove(@Param('id') idCartao: number, @Res() response): Promise<void> {
        try {
            await this.cartaoService.remove(idCartao);
            return response.status(HttpStatus.OK).json({ message: `Registro com ID ${idCartao} deletado com sucesso` });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: `ID ${idCartao} não encontrado` });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    @ApiOkResponse({
        description: 'Registro atualizado com sucesso',
        type: CartaoModel,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') idCartao: number, @Body() cartaoDTO: CartaoDTO): Promise<CartaoModel> {
        return await this.cartaoService.update(idCartao, cartaoDTO);
    }
}
