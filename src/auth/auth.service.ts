import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<UserEntity> {
        const hashedPassword = await hash(registerDto.password, 10);
        const user = await this.userService.create({
            ...registerDto,
            password: hashedPassword,
        });

        return user;
    }

    async login(user: UserEntity) {
        const payload = {
            id: user.id,
            name: user.name,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getByEmail(email);
        const isValidPassword = await compare(password, user.password);
        return isValidPassword ? user : null;
    }
}
