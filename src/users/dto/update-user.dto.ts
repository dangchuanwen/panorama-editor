import { Country, Gender } from '../schemas/user.schema';

export class UpdateUserDto {
  gender: Gender;
  country: Country;
  introductionVideoLink: string;
  introductionTextLink: string;
  avatarUrl: string;
}
