import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req) {
        return await this.authService.login(req.user);
    }
}
