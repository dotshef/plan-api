import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './dto/post.entity';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'List all posts (newest first)' })
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single post by id' })
  @ApiOkResponse({ type: PostEntity })
  @ApiNotFoundResponse()
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  @ApiCreatedResponse({ type: PostEntity })
  create(@Body() dto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a post' })
  @ApiOkResponse({ type: PostEntity })
  @ApiNotFoundResponse()
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a post' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}
