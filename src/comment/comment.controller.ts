import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { GetCommentsOfPublishedWorkDto } from './dto/comments-of-published-work.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async comment(@Request() req: { user: JwtDto }, @Body() body: CommentDto) {
    return this.commentsService.createComment(
      body.content,
      req.user.userName,
      body.publishedWorkID,
    );
  }

  @Get()
  async getCommentsOfPublishedWork(
    @Query() query: GetCommentsOfPublishedWorkDto,
  ) {
    return this.commentsService.getCommentsOfPublishedWork(
      query.publishedWorkID,
    );
  }
}
