import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublishedWorkModule } from 'src/publishedWorks/publishedWorks.module';
import { UsersModule } from 'src/users/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema, Comment } from './schemas/comment.schema';

@Module({
  imports: [
    UsersModule,
    PublishedWorkModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
