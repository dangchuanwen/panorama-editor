import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './schemas/work.schema';
import { WorksService } from './works.service';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get('users')
  async getAllUsersWorks(): Promise<Array<{ user: User; works: Work[] }>> {
    return this.worksService.getAllUsersWorks();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWorks(@Request() req: { user: JwtDto }): Promise<Work[]> {
    return this.worksService.getUserWorks(req.user.userName);
  }

  @Get('/:workID')
  async getWork(@Param('workID') workID: string): Promise<Work> {
    return this.worksService.getUserWorkByID(workID);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWork(
    @Request() req: { user: JwtDto },
    @Body() body: CreateWorkDto,
  ): Promise<Work> {
    return this.worksService.createWork(body.workName, req.user.userName);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateWork(
    @Request() req: { user: JwtDto },
    @Body() body: UpdateWorkDto,
  ): Promise<Work> {
    return this.worksService.updateWork(
      body.workID,
      req.user.userName,
      body.panoramaTourConfig,
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('/:workID')
  async deleteWork(
    @Param('workID') workID: string,
    @Request() req: { user: JwtDto },
  ) {
    const workOwner = await this.worksService.getWorkOwner(workID);
    if (!workOwner || workOwner.userName !== req.user.userName) {
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
    }
    await this.worksService.removeWork(workID);
  }
}
