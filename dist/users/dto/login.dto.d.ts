import { User } from '../schemas/user.schema';
export declare class LoginRequestDto {
    userName: string;
    password: string;
}
export declare class LoginResponseDto {
    access_token: string;
    user: User;
}
