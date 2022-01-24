import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { GroupingDto } from './dto/grouping.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import { UpdateUserIntroTextLinkDto } from './dto/update-user-intro-text-link.dto';
import { UpdateUserIntroVideoLinkDto } from './dto/update-user-intro-video-link.dto';
import { UpdateUserParticipateStatusDto } from './dto/update-user-participate-status.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { updatePreferCultureThemesDto } from './dto/updatePreferCultureThemes.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(@Body() body: CreateUserRequestDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(
    @Body() body: UpdateUserDto,
    @Request() req: { user: JwtDto },
  ) {
    return this.userService.updateUser(req.user.userName, body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  async adminLogin(@Body() body: LoginRequestDto) {
    return await this.authService.adminLogin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('information')
  async getProfile(@Request() req: { user: JwtDto }) {
    return this.userService.findUserByUserName(req.user.userName);
  }

  @UseGuards(JwtAuthGuard)
  @Put('grouping')
  async grouping(@Body() body: GroupingDto, @Request() req: { user: JwtDto }) {
    return this.userService.grouping(req.user.userName, body.group);
  }

  @UseGuards(JwtAuthGuard)
  @Get('members')
  async getGroupMembers(@Request() req: { user: JwtDto }) {
    return this.userService.getGroupMembers(req.user.userName);
  }

  @UseGuards(JwtAuthGuard)
  @Put('preferCultureThemes')
  async updatePreferCultureThemes(
    @Body() body: updatePreferCultureThemesDto,
    @Request() req: { user: JwtDto },
  ) {
    return this.userService.updateUserPreferCultureThemes(
      req.user.userName,
      body.preferCultureThemesNames,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Get('preferCultureThemes/all')
  async getAllUserPreferCultureThemes() {
    return this.userService.getAllUsersPreferCultureThemes();
  }

  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/:id/group')
  async updateUserGroup(
    @Param('id') id: string,
    @Body() body: UpdateUserGroupDto,
  ) {
    return this.userService.updateUserGroup(id, body.group);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/:id/intro-text-link')
  async setUserIntroTextLink(
    @Param('id') id: string,
    @Body() body: UpdateUserIntroTextLinkDto,
  ) {
    return this.userService.setUserIntroductionTextLink(id, body.link);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/:id/intro-video-link')
  async setUserIntroVideoLink(
    @Param('id') id: string,
    @Body() body: UpdateUserIntroVideoLinkDto,
  ) {
    return this.userService.setUserIntroductionVideoLink(id, body.link);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/:id/participate-status')
  async setUserParticipateStatus(
    @Param('id') id: string,
    @Body() body: UpdateUserParticipateStatusDto,
  ) {
    return this.userService.setUserParticipateStatus(id, body.status);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/:id/password')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() body: UpdateUserPasswordDto,
  ) {
    return this.userService.updateUserPassword(id, body.password);
  }
}