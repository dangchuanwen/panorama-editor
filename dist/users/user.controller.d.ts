import { AuthService } from 'src/auth/auth.service';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { GroupingDto } from './dto/grouping.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './user.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    register(body: CreateUserRequestDto): Promise<User>;
    login(body: LoginRequestDto): Promise<LoginResponseDto>;
    getProfile(req: {
        user: JwtDto;
    }): Promise<import("./schemas/user.schema").UserDocument>;
    grouping(body: GroupingDto, req: {
        user: JwtDto;
    }): Promise<import("./schemas/user.schema").UserDocument>;
}
