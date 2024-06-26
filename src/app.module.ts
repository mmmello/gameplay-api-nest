/* eslint-disable prettier/prettier */
import { Module, 
  ValidationPipe,    }          from '@nestjs/common';
import { Dialect }              from "sequelize";
import { SequelizeModule }      from '@nestjs/sequelize';
import { AppController }        from './app.controller';
import { AppService }           from './app.service';
import * as dotenv              from 'dotenv';
//import { TransformInterceptor } from '../strategies/transform/transform.interceptor';
import { APP_PIPE }             from '@nestjs/core';
//import { json }                 from 'express';

import { UsuarioModule }        from './usuario/usuario.module';
import { UsuarioModel }         from './usuario/entities/usuario.entity';

import { EnderecoModule }       from './endereco/endereco.module';
import { EnderecoModel }        from './endereco/entities/endereco.entity';

import { AuthModule }           from './auth/auth.module';

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
//    {
//      provide: APP_INTERCEPTOR,
//      useClass: TransformInterceptor, 
//    },
  ]
})
export class AppModule {
//  configure(consumer: MiddlewareConsumer) {
//    consumer.apply(json()).forRoutes({ path: '*', method: RequestMethod.ALL });
 // }
}