/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoritoController } from './favorito.controller';
import { FavoritoService } from './service/favorito.service';
import { FavoritoModel } from './entities/favorito.entity';
import { FavoritoRepository } from './repository/favorito.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([FavoritoModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [FavoritoController],
    providers: [FavoritoService, FavoritoRepository],
    exports: [FavoritoService],
})
export class FavoritoModule {}
