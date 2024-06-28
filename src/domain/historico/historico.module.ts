/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './service/historico.service';
import { HistoricoModel } from './entities/historico.entity';
import { HistoricoRepository } from './repository/historico.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([HistoricoModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [HistoricoController],
    providers: [HistoricoService, HistoricoRepository],
    exports: [HistoricoService],
})
export class HistoricoModule {}
