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

/*
import { RequisitoModule }  from './requisito/requisito.module';
import { JogoModule }       from './jogo/jogo.module';
import { IdiomaModule }     from './idioma/idioma.module';
import { HistoricoModule }  from './historico/historico.module';
import { FavoritoModule }   from './favorito/favorito.module';
import { CategoriaModule }  from './categoria/categoria.module';
import { CartoesModule }    from './cartoes/cartoes.module';*/

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
      models: [UsuarioModel, EnderecoModel/*, RequisitoModule, JogoModule, IdiomaModule, HistoricoModule, FavoritoModule, CategoriaModule, CartoesModule*/],
    }),
    UsuarioModule,
    EnderecoModule,
    AuthModule
    /*RequisitoModule,
    JogoModule,
    IdiomaModule,
    HistoricoModule,
    FavoritoModule,
    CategoriaModule,
    CartoesModule*/
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