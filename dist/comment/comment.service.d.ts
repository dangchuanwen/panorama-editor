import { Model } from 'mongoose';
import { PublishedWorkService } from 'src/publishedWorks/publishedWork.service';
import { UsersService } from 'src/users/user.service';
import { CommentDocument } from './schemas/comment.schema';
export declare class CommentService {
    private readonly commentModel;
    private readonly usersService;
    private readonly publishedWorksService;
    constructor(commentModel: Model<CommentDocument>, usersService: UsersService, publishedWorksService: PublishedWorkService);
    createComment(content: string, userName: string, commentedPublishedWorkID: string): Promise<CommentDocument>;
    getCommentsOfPublishedWork(commentedPublishedWorkID: string): Promise<CommentDocument[]>;
    removeComment(commentID: string, userName: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
