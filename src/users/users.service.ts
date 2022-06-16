import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(userDto: UserDto): Promise<UserEntity> {
        const user = this.userRepository.create(userDto);
        return await this.userRepository.save(user);
    }

    async getByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({
            email: email,
        });
        return user;
    }
}
