import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetPublishedWorkByIDDto } from './dto/getPublishedWorkByID.dto';
import {
  GetPublishedWorksBeforeAnchorDateBodyDto,
  GetPublishedWorksBeforeAnchorDateParamDto,
} from './dto/getPublishedWorksBeforeAnchorDate.dto';
import { PublishWorkDto } from './dto/publishWork.dto';
import { PublishedWorkService } from './publishedWork.service';

@Controller('published-works')
export class PublishedWorkController {
  constructor(private readonly publishedWorkService: PublishedWorkService) {}

  @UseGuards(JwtAuthGuard)
  @Get('group')
  async getPublishedWorksOfGroupMembers(@Request() req: { user: JwtDto }) {
    return this.publishedWorkService.getPublishedWorksOfGroupMembersByUserName(
      req.user.userName,
    );
  }

  @Post('before/:anchorDate/count/:dataCount')
  async getPublishedWorksBeforeAnchorDate(
    @Param() params: GetPublishedWorksBeforeAnchorDateParamDto,
    @Body() body: GetPublishedWorksBeforeAnchorDateBodyDto,
  ) {
    return this.publishedWorkService.findPublishedWorksBeforeAnchorDate(
      new Date(Number(params.anchorDate)),
      Number(params.dataCount),
      body.cultureThemesNames || [],
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:workID')
  async getPublishedWorkByID(
    @Param() params: GetPublishedWorkByIDDto,
    @Request() req: { user: JwtDto },
  ) {
    const { workID } = params;
    const {
      user: { userName },
    } = req;
    return this.publishedWorkService.findUserPublishedWorkByWorkID(
      userName,
      workID,
    );
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
