import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/auth/constants';
import { CultureThemesService } from 'src/cultureThemes/cultureThemes.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly cultureThemesService: CultureThemesService,
  ) {}

  async findUserByUserName(userName: string): Promise<UserDocument> {
    return this.userModel.findOne({ userName });
  }

  async updateUser(userName: string, profile: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(
      { userName },
      {
        gender: profile.gender,
        country: profile.country,
        introductionVideoLink: profile.introductionVideoLink,
        avatarUrl: profile.avatarUrl,
      },
      {
        useFindAndModify: false,
      },
    );
  }

  async grouping(userName: string, group: string): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate({ userName }, { $set: { group } });
  }

  async getGroupMembers(userName: string) {
    const user = await this.findUserByUserName(userName);
    const group = user.group;
    let members: User[] = [];
    if (group) {
      members = await this.userModel.find({ group }).lean();
    }
    return members.filter((member) => member.userName !== userName);
  }

  async getGroupMembersByUserName(userName: string): Promise<UserDocument[]> {
    let groupMembers = [];
    const user: UserDocument = await this.findUserByUserName(userName);
    const group = user.group;
    if (group === null) {
      return groupMembers;
    }

    groupMembers = await this.userModel.find({ group });
    return groupMembers;
  }

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    // check if user already exist
    const oldUser: User = await this.findUserByUserName(
      createUserRequestDto.userName,
    );
    if (oldUser) {
      throw new UserAlreadyExistException();
    }
    // create new user
    const hash = await bcrypt.hash(createUserRequestDto.password, saltOrRounds);
    const user = await this.userModel.create({
      userName: createUserRequestDto.userName,
      password: hash,
      gender: createUserRequestDto.gender,
      country: createUserRequestDto.country,
    });
    return user;
  }

  async updateUserPreferCultureThemes(
    userName: string,
    cultureThemesNames: string[],
  ) {
    const cultureThemes = await Promise.all(
      cultureThemesNames.map((name) =>
        this.cultureThemesService.findCultureThemeByName(name),
      ),
    );

    return this.userModel.findOneAndUpdate(
      {
        userName,
      },
      { preferCultureThemes: cultureThemes },
      {
        useFindAndModify: false,
      },
    );
  }

  async getUserPreferCultureThemes(userName: string) {
    const user = await this.userModel
      .findOne({ userName })
      .populate('preferCultureThemes');
    const preferCultureThemes = (user && user.preferCultureThemes) || [];
    return preferCultureThemes;
  }
}
