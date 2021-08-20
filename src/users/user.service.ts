import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUserByUserName(userName: string): Promise<User> {
    return this.userModel.findOne({ userName });
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
    });
    return user;
  }
}
