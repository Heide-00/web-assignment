import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/types/User';
import { Post } from 'src/types/Post';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Gül', username: 'guldev', email: 'gul@example.com' },
    { id: 2, name: 'Ali', username: 'alicode', email: 'ali@example.com' },
  ];

  constructor(private readonly postsService: PostsService) {}

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(user: CreateUserDto): User {
    const newUser: User = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...updatedUser };
    return this.users[index];
  }

  delete(id: number): { deleted: boolean } {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: this.users.length < initialLength };
  }

  addPostToUser(userId: number, postDto: Omit<CreatePostDto, 'userId'>): Post {
    return this.postsService.create({ userId, ...postDto });
  }
}
