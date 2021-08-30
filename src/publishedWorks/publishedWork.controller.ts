import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PublishWorkDto } from './dto/publishWork.dto';
import { PublishedWorkService } from './publishedWork.service';

@Controller('published-works')
export class PublishedWorkController {
  constructor(private readonly publishedWorkService: PublishedWorkService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPublishedWorks() {
    return this.publishedWorkService.findAllPublishedWorks();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async publishWork(
    @Body() body: PublishWorkDto,
    @Request() req: { user: JwtDto },
  ) {
    const { introduction, workID } = body;
    return this.publishedWorkService.savePublishedWork(
      req.user.userName,
      workID,
      introduction,
    );
  }
}
