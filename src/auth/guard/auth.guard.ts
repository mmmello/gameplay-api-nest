/* eslint-disable prettier/prettier */
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Logger,
  } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY, jwtConstants } from '../constants/constants';
  
    @Injectable()
    export class AuthGuard implements CanActivate {
        private readonly logger = new Logger(AuthGuard.name);
  
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ context.getHandler(), context.getClass() ]);

        if (isPublic) {
            return true;
        }
    
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            this.logger.warn('Token não encontrado');
            throw new UnauthorizedException();
        }
    
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            request['usuario'] = payload;
        } catch (err) {

            this.logger.error('Token verification failed', err.message);
            throw new UnauthorizedException();
        }
        
        return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        this.logger.log(`Extracted token: ${token}`);
        return type === 'Bearer' ? token : undefined;
    }
}