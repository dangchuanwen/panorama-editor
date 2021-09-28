import { UsersService } from 'src/users/user.service';
import { LoginRequestDto, LoginResponseDto } from 'src/users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(userName: string, password: string): Promise<User>;
    login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto>;
}
