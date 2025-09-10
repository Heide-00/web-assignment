import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import type { Post as PostType } from 'src/types/Post';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @Get()
  findAll(): PostType[] {
    return this.postsService.findAll();
  }

 
  @Get(':id')
  findOne(@Param('id') id: string): PostType | undefined {
    return this.postsService.findOne(+id);
  }


  @Post()
  create(@Body() post: CreatePostDto): PostType {
    return this.postsService.create(post);
  }

  
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
  ): PostType | undefined {
    return this.postsService.update(+id, post);
  }


  @Delete(':id')
  delete(@Param('id') id: string): { deleted: boolean } {
    return this.postsService.delete(+id);
  }
}
