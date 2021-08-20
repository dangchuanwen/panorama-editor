import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './schemas/work.schema';
import { WorksService } from './works.service';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWorks(@Request() req: { user: JwtDto }): Promise<Work[]> {
    return this.worksService.getUserWorks(req.user.userName);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:workName')
  async getWork(
    @Request() req: { user: JwtDto },
    @Param('workName') workName: string,
  ): Promise<Work> {
    return this.worksService.getUserWork(req.user.userName, workName);
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
      body.workName,
      req.user.userName,
      body.panoramaTourConfig,
    );
  }
}
