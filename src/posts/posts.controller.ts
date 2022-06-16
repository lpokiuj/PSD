import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get()
    async getAll() {
        return await this.postService.getAllPost();
    }

    @Get(':id')
    async getByID(@Param('id') id: string) {
        return await this.postService.getPostByID(id);
    }

    @Post()
    async createPost(@Body() postDto: PostDto, @Req() req) {
        return await this.postService.create(postDto, req.user.id);
    }

    @Patch(':id')
    async updatePost(@Body() postDto: PostDto, @Param('id') id: string) {
        return await this.postService.update(postDto, id);
    }

    @Delete(':id')
    async deletePost(id: string) {
        return await this.postService.delete(id);
    }
}
