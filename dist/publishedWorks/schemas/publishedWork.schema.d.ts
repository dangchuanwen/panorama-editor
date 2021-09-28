import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Work } from 'src/works/schemas/work.schema';
export declare type PublishedWorkDocument = PublishedWork & mongoose.Document;
export declare class PublishedWork {
    user: User;
    work: Work;
    introduction: string;
    createdTime: Date;
}
export declare const PublishedWorkSchema: mongoose.Schema<mongoose.Document<PublishedWork, any, any>, mongoose.Model<mongoose.Document<PublishedWork, any, any>, any, any>, undefined, {}>;
