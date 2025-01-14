import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'password', // Usa una clave secreta segura.
            signOptions: { expiresIn: '1h' }, // Duración del token.
        }),
    ],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
})
export class AuthModule { }
