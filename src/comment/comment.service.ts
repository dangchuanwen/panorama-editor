import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublishedWorkService } from 'src/publishedWorks/publishedWork.service';
import { UsersService } from 'src/users/user.service';
import { CommentDocument, Comment } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly usersService: UsersService,
    private readonly publishedWorksService: PublishedWorkService,
  ) {}

  async createComment(
    content: string,
    userName: string,
    commentedPublishedWorkID: string,
  ) {
    const publisher = await this.usersService.findUserByUserName(userName);
    const commentedPublishedWork =
      await this.publishedWorksService.findPublishedWorkByID(
        commentedPublishedWorkID,
      );
    return this.commentModel.create({
      content,
      publisher,
      commentedPublishedWork,
    });
  }

  async getCommentsOfPublishedWork(commentedPublishedWorkID: string) {
    const commentedPublishedWork =
      await this.publishedWorksService.findPublishedWorkByID(
        commentedPublishedWorkID,
      );
    const comments = await this.commentModel.find({ commentedPublishedWork });
    return comments;
  }
}
