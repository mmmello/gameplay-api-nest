/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequisitoController } from './requisito.controller';
import { RequisitoService } from './service/requisito.service';
import { RequisitoModel } from './entities/requisito.entity';
import { RequisitoRepository } from './repository/requisito.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([RequisitoModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [RequisitoController],
    providers: [RequisitoService, RequisitoRepository],
    exports: [RequisitoService],
})
export class RequisitoModule {}
