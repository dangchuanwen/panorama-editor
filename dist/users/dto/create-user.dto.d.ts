import { Country, Gender } from '../schemas/user.schema';
export declare class CreateUserRequestDto {
    userName: string;
    password: string;
    gender: Gender;
    country: Country;
}
