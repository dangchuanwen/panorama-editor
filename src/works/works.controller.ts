import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateWorkDto } from './dto/create-work.dto';
import { Work } from './schemas/work.schema';
import { WorksService } from './works.service';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWork(
    @Request() req: { user: JwtDto },
    @Body() body: CreateWorkDto,
  ): Promise<Work> {
    return this.worksService.createWork(body.workName, req.user.userName);
  }
}
