/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartaoController } from './cartoes.controller';
import { CartaoService } from './service/cartoes.service';
import { CartaoModel } from './entities/cartoes.entity';
import { CartaoRepository } from './repository/cartoes.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([CartaoModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [CartaoController],
    providers: [CartaoService, CartaoRepository],
    exports: [CartaoService],
})
export class CartoesModule {}
