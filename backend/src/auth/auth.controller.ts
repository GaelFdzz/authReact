import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body('email') email: string, @Body('password') password: string) {
        return { message: await this.authService.register(email, password) };
    }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        console.log({ email, password }); // Verifica los datos recibidos
        return { message: await this.authService.login(email, password) };
    }



    @Get('users')
    async getUsers() {
        return await this.authService.getUsers();
    }
}