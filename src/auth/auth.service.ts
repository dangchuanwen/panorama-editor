import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { LoginRequestDto, LoginResponseDto } from 'src/users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByUserName(userName);
    const hash = (user && user.password) || '';
    const passwordMatches = await bcrypt.compare(password, hash);
    return passwordMatches ? user : null;
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const payload = { userName: loginRequestDto.userName };
    const user = await this.usersService.findUserByUserName(
      loginRequestDto.userName,
    );
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async adminLogin(
    loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const payload = { userName: loginRequestDto.userName };
    const user = await this.usersService.findUserByUserName(
      loginRequestDto.userName,
    );
    if (user.userName !== process.env.admin) {
      throw new HttpException('Access dinied', HttpStatus.FORBIDDEN);
    }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
