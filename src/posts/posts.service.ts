import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    async create(postDto: PostDto, userID: string) {
        const post = this.postRepository.create({
            ...postDto,
            author: {
                id: userID,
            },
        });
        return await this.postRepository.save(post);
    }

    async getAllPost() {
        return await this.postRepository.find();
    }

    async getPostByID(id: string) {
        return await this.postRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    async update(postDto: PostDto, id: string) {
        const post = await this.postRepository.findOne({
            where: {
                id: id,
            },
        });

        const newPost = {
            ...post,
            ...postDto,
        };

        const updatedPost = this.postRepository.create(newPost);
        return await this.postRepository.save(updatedPost);
    }

    async delete(id: string) {
        return await this.postRepository.softDelete(id);
    }
}
