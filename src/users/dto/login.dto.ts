import { User } from '../schemas/user.schema';

export class LoginRequestDto {
  userName: string;
  password: string;
}

export class LoginResponseDto {
  access_token: string;
  user: User;
}
