import { JwtDto } from 'src/auth/dto/jwt.dto';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { GetCommentsOfPublishedWorkDto } from './dto/comments-of-published-work.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
export declare class CommentController {
    private readonly commentsService;
    constructor(commentsService: CommentService);
    comment(req: {
        user: JwtDto;
    }, body: CommentDto): Promise<import("./schemas/comment.schema").CommentDocument>;
    getCommentsOfPublishedWork(query: GetCommentsOfPublishedWorkDto): Promise<import("./schemas/comment.schema").CommentDocument[]>;
    deleteComment(params: DeleteCommentDto, req: {
        user: JwtDto;
    }): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
