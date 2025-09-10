import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import type { User } from 'src/types/User';
import type { Post as PostType} from 'src/types/Post';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException({
        message: `User with ID ${id} not found`,
        errorCode: 'USER_NOT_FOUND',
      });
    }
    return user;
  }

  @Post()
  create(@Body() user: CreateUserDto): User {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto): User {
    const updated = this.usersService.update(+id, user);
    if (!updated) {
      throw new NotFoundException({
        message: `User with ID ${id} not found`,
        errorCode: 'USER_UPDATE_FAILED',
      });
    }
    return updated;
  }

  @Delete(':id')
  delete(@Param('id') id: string): { deleted: boolean } {
    const result = this.usersService.delete(+id);
    if (!result.deleted) {
      throw new NotFoundException({
        message: `User with ID ${id} not found`,
        errorCode: 'USER_DELETE_FAILED',
      });
    }
    return result;
  }

  @Post(':id/posts')
  addPostToUser(
    @Param('id') userId: string,
    @Body() post: Omit<CreatePostDto, 'userId'>,
  ): PostType {
    const userExists = this.usersService.findOne(+userId);
    if (!userExists) {
      throw new NotFoundException({
        message: `User with ID ${userId} not found`,
        errorCode: 'USER_POST_FAILED',
      });
    }
    return this.usersService.addPostToUser(+userId, post);
  }
}
