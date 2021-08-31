import { Country, Gender } from '../schemas/user.schema';

export class CreateUserRequestDto {
  userName: string;
  password: string;
  gender: Gender;
  country: Country;
}
