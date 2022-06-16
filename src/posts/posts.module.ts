import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostEntity } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    controllers: [PostsController],
    providers: [
        PostsService,
    ],
})
export class PostsModule {}
