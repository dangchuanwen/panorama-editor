import { JwtDto } from 'src/auth/dto/jwt.dto';
import { GetPublishedWorkByIDDto } from './dto/getPublishedWorkByID.dto';
import { GetPublishedWorksBeforeAnchorDate } from './dto/getPublishedWorksBeforeAnchorDate.dto';
import { PublishWorkDto } from './dto/publishWork.dto';
import { PublishedWorkService } from './publishedWork.service';
export declare class PublishedWorkController {
    private readonly publishedWorkService;
    constructor(publishedWorkService: PublishedWorkService);
    getPublishedWorksOfGroupMembers(req: {
        user: JwtDto;
    }): Promise<import("./schemas/publishedWork.schema").PublishedWorkDocument[]>;
    getPublishedWorksBeforeAnchorDate(params: GetPublishedWorksBeforeAnchorDate): Promise<any[]>;
    getAllPublishedWorks(): Promise<any[]>;
    getPublishedWorkByID(params: GetPublishedWorkByIDDto, req: {
        user: JwtDto;
    }): Promise<import("./schemas/publishedWork.schema").PublishedWorkDocument>;
    publishWork(body: PublishWorkDto, req: {
        user: JwtDto;
    }): Promise<import("./schemas/publishedWork.schema").PublishedWorkDocument>;
}
