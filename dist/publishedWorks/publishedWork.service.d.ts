import { Model } from 'mongoose';
import { UsersService } from 'src/users/user.service';
import { WorksService } from 'src/works/works.service';
import { PublishedWorkDocument } from './schemas/publishedWork.schema';
export declare class PublishedWorkService {
    private readonly publishedWorksModel;
    private readonly usersService;
    private readonly worksService;
    aggregateArray: any[];
    constructor(publishedWorksModel: Model<PublishedWorkDocument>, usersService: UsersService, worksService: WorksService);
    findAllPublishedWorks(): Promise<any[]>;
    findPublishedWorkByID(publishedWorkID: string): Promise<PublishedWorkDocument>;
    findUserPublishedWorkByWorkID(userName: string, workID: string): Promise<PublishedWorkDocument>;
    findPublishedWorksBeforeAnchorDate(anchorDate: Date, dataCount: number): Promise<any[]>;
    savePublishedWork(userName: string, workID: string, introduction: string): Promise<PublishedWorkDocument>;
    getPublishedWorksOfGroupMembersByUserName(userName: string): Promise<PublishedWorkDocument[]>;
}
