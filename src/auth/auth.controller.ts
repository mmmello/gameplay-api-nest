/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './service/auth.service'; 
import { AuthDto } from './dto/auth.dto';
import { Public } from './constants/constants';

@ApiTags('Autenticação')
@ApiBearerAuth()
@Controller('auth')
@UsePipes(ValidationPipe) 

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @Post('login')
    async login(@Body() auth: AuthDto) {
        return await this.authService.login(auth.email, auth.senha);
    }
}