/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JogoController } from './jogo.controller';
import { JogoService } from './service/jogo.service';
import { JogoModel } from './entities/jogo.entity';
import { JogoRepository } from './repository/jogo.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([JogoModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [JogoController],
    providers: [JogoService, JogoRepository],
    exports: [JogoService],
})
export class JogoModule {}
