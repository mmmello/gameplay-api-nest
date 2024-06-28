/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, 
  Module, 
  RequestMethod, 
  ValidationPipe }              from '@nestjs/common';
import { Dialect }              from "sequelize";
import { SequelizeModule }      from '@nestjs/sequelize';
import { AppController }        from './app.controller';
import { AppService }           from './app.service';
import * as dotenv              from 'dotenv';
import { TransformInterceptor } from '../strategies/transform/transform.interceptor';
import { APP_PIPE, 
  APP_INTERCEPTOR, 
  APP_GUARD}                    from '@nestjs/core';

import { UsuarioModule }        from '../domain/usuario/usuario.module';
import { UsuarioModel }         from '../domain/usuario/entities/usuario.entity';

import { EnderecoModule }       from '../domain/endereco/endereco.module';
import { EnderecoModel }        from '../domain/endereco/entities/endereco.entity';

import { AuthModule }           from '../domain/auth/auth.module';

import { AuthGuard }            from '../domain/auth/guard/auth.guard';

import { LoggingMiddleware } from '../infrastructure/logging.middleware';

import { RequisitoModule }  from '../domain/requisito/requisito.module';
import { RequisitoModel } from 'src/domain/requisito/entities/requisito.entity';

import { JogoModule }       from '../domain/jogo/jogo.module';
import { JogoModel } from 'src/domain/jogo/entities/jogo.entity';

import { IdiomaModule }     from '../domain/idioma/idioma.module';
import { IdiomaModel } from 'src/domain/idioma/entities/idioma.entity';

import { HistoricoModule }  from '../domain/historico/historico.module';
import { HistoricoModel } from 'src/domain/historico/entities/historico.entity';

import { FavoritoModule }   from '../domain/favorito/favorito.module';
import { FavoritoModel } from 'src/domain/favorito/entities/favorito.entity';

import { CategoriaModule }  from '../domain/categoria/categoria.module';
import { CategoriaModel } from 'src/domain/categoria/entities/categoria.entity';

import { CartoesModule }    from '../domain/cartoes/cartoes.module';
import { CartaoModel } from 'src/domain/cartoes/entities/cartoes.entity';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      models: [UsuarioModel, EnderecoModel, RequisitoModel, JogoModel, IdiomaModel, HistoricoModel, FavoritoModel, CategoriaModel, CartaoModel],
    }),
    UsuarioModule,
    EnderecoModule,
    AuthModule,
    RequisitoModule,
    JogoModule,
    IdiomaModule,
    HistoricoModule,
    FavoritoModule,
    CategoriaModule,
    CartoesModule
  ],
  controllers:  [AppController],
  providers:    [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor, 
    },    
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}