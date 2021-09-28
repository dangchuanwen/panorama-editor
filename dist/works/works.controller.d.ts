import { JwtDto } from 'src/auth/dto/jwt.dto';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work, WorkTheme } from './schemas/work.schema';
import { WorksService } from './works.service';
export declare class WorksController {
    private readonly worksService;
    constructor(worksService: WorksService);
    getWorkThemeList(): Promise<WorkTheme[]>;
    getWorks(req: {
        user: JwtDto;
    }): Promise<Work[]>;
    getWork(workID: string): Promise<Work>;
    createWork(req: {
        user: JwtDto;
    }, body: CreateWorkDto): Promise<Work>;
    updateWork(req: {
        user: JwtDto;
    }, body: UpdateWorkDto): Promise<Work>;
}
