import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string): Promise<string> {
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new HttpException('Usuario ya existe', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return 'Usuario registrado con éxito';
    }


    async login(email: string, password: string): Promise<{ token: string }> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        console.log("Inicio correcto")
        console.log({ token });
        return { token };
    }


    async getUsers(): Promise<{ email: string }[]> {
        return this.prisma.user.findMany({
            select: { email: true },
        });
    }


    async validateUser(userId: string): Promise<any> {
        const numericId = parseInt(userId, 10);
        if (isNaN(numericId)) {
            throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }
        return this.prisma.user.findUnique({ where: { id: numericId } });
    }

}
