import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Verifica la expiración del token
            secretOrKey: process.env.JWT_SECRET || 'password', // Clave secreta
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email }; // Devuelve los datos del token
    }
}