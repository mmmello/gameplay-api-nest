/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './service/categoria.service';
import { CategoriaModel } from './entities/categoria.entity';
import { CategoriaRepository } from './repository/categorias.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        SequelizeModule.forFeature([CategoriaModel]),
        CacheModule.register({
            useFactory: () => ({
                store: redisStore,
                url: 'redis://redis-compose:6379',
            }),
        }),
    ],
    controllers: [CategoriaController],
    providers: [CategoriaService, CategoriaRepository],
    exports: [CategoriaService],
})
export class CategoriaModule {}
