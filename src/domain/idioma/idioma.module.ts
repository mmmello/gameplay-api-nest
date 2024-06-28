/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IdiomaController } from './idioma.controller';
import { IdiomaService } from './service/idioma.service';
import { IdiomaModel } from './entities/idioma.entity';
import { IdiomaRepository } from './repository/idioma.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([IdiomaModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [IdiomaController],
    providers: [IdiomaService, IdiomaRepository],
    exports: [IdiomaService],
})
export class IdiomaModule {}
