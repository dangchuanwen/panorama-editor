import { Document, Schema as mongooseSchema } from 'mongoose';
import { PublishedWork } from 'src/publishedWorks/schemas/publishedWork.schema';
import { User } from 'src/users/schemas/user.schema';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    content: string;
    commentedPublishedWork: PublishedWork;
    publisher: User;
    createdTime: Date;
}
export declare const CommentSchema: mongooseSchema<Document<Comment, any, any>, import("mongoose").Model<Document<Comment, any, any>, any, any>, undefined, {}>;
