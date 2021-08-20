import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
