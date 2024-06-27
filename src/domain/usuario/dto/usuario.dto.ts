/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString} from "class-validator";

export class UsuarioDTO {

    @ApiProperty()
    @IsString()
    readonly nome: string;

    @ApiProperty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly senha: string;

    @ApiProperty()
    @IsString()
    readonly telefone: string;

    @ApiProperty()
    @IsString()
    readonly cpf: string;

    @ApiProperty()
    @IsString()
    readonly avatar: string;
}
