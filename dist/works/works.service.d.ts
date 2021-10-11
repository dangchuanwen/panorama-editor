import { Model } from 'mongoose';
import { PanoramaTourConfig, WorkDocument, WorkTheme } from './schemas/work.schema';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/users/schemas/user.schema';
export declare class WorksService {
    private readonly worksModel;
    private readonly usersService;
    constructor(worksModel: Model<WorkDocument>, usersService: UsersService);
    findWork(workName: string, user: User): Promise<WorkDocument>;
    findWorkByID(workID: string): Promise<WorkDocument>;
    getUserWorkByID(workID: string): Promise<WorkDocument>;
    getUserWorks(userName: string): Promise<WorkDocument[]>;
    createWork(workName: string, workTheme: WorkTheme, userName: string): Promise<WorkDocument>;
    updateWork(workID: string, userName: string, panoramaTourConfig: PanoramaTourConfig): Promise<WorkDocument>;
    getWorkOwner(workdID: string): Promise<User>;
    removeWork(workdID: string): Promise<void>;
}
