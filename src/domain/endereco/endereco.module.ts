/* eslint-disable prettier/prettier */
import { Module }               from '@nestjs/common';
import { SequelizeModule }      from '@nestjs/sequelize';
import { EnderecoController }    from './endereco.controller';
import { EnderecoService }       from './service/endereco.service';
import { EnderecoModel }         from './entities/endereco.entity';
import { EnderecoRepository }    from './repository/endereco.repository';
import { CacheModule }          from '@nestjs/cache-manager';
import { redisStore }           from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([EnderecoModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [EnderecoController],
    providers: [EnderecoService, EnderecoRepository],
    exports: [EnderecoService],
})

export class EnderecoModule {}