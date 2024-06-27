/* eslint-disable prettier/prettier */
import { Module }               from '@nestjs/common';
import { SequelizeModule }      from '@nestjs/sequelize';
import { CacheModule }          from '@nestjs/cache-manager';
import { redisStore }           from 'cache-manager-redis-store';

import { UsuarioController }    from './usuario.controller';
import { UsuarioService }       from './service/usuario.service';
import { UsuarioModel }         from './entities/usuario.entity';
import { UsuarioRepository }    from './repository/usuario.repository';


@Module({
    imports: [
        SequelizeModule.forFeature([UsuarioModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository],
    exports: [UsuarioService],
})

export class UsuarioModule {}