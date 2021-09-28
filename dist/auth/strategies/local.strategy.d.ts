import { Strategy } from 'passport-local';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(userName: string, password: string): Promise<User>;
}
export {};
