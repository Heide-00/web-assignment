import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import type { Post } from 'src/types/Post';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, userId: 1, title: 'İlk post' },
    { id: 2, userId: 2, title: 'İkinci post' },
  ];


  findAll(): Post[] {
    return this.posts;
  }


  findOne(id: number): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

 
  create(post: CreatePostDto): Post {
    const newPost: Post = {
      id: Date.now(),
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatedPost: UpdatePostDto): Post | undefined {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index === -1) return undefined;
    this.posts[index] = { ...this.posts[index], ...updatedPost };
    return this.posts[index];
  }

 
  delete(id: number): { deleted: boolean } {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter((post) => post.id !== id);
    return { deleted: this.posts.length < initialLength };
  }
}
