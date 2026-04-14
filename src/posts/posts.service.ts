import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { DRIZZLE, Database } from '../db/client';
import { posts, Post } from '../db/schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findAll(): Promise<Post[]> {
    return this.db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async findOne(id: string): Promise<Post> {
    const [row] = await this.db.select().from(posts).where(eq(posts.id, id)).limit(1);
    if (!row) {
      throw new NotFoundException('Post not found');
    }
    return row;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const [row] = await this.db
      .insert(posts)
      .values({ title: dto.title, content: dto.content })
      .returning();
    return row;
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    // updatedAt refreshed manually here per project convention (not via $onUpdate).
    const [row] = await this.db
      .update(posts)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    if (!row) {
      throw new NotFoundException('Post not found');
    }
    return row;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
    if (deleted.length === 0) {
      throw new NotFoundException('Post not found');
    }
  }
}
