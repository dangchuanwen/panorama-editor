import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PanoramaTourConfig,
  Work,
  WorkDocument,
  WorkTheme,
} from './schemas/work.schema';
import { WorkAlreadyExistException } from './exceptions/work-already-exist.exception';
import { UsersService } from 'src/users/user.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class WorksService {
  constructor(
    @InjectModel(Work.name) private readonly worksModel: Model<WorkDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findWork(workName: string, user: User) {
    return this.worksModel.findOne({ workName, user });
  }

  async findWorkByID(workID: string) {
    return this.worksModel.findById(workID);
  }

  async getUserWorkByID(userName: string, workID: string) {
    const user = await this.usersService.findUserByUserName(userName);
    const work = await this.worksModel.findOne({
      user,
      _id: mongoose.Types.ObjectId(workID),
    });
    return work;
  }

  async getUserWorks(userName: string) {
    const user = await this.usersService.findUserByUserName(userName);
    const works = await this.worksModel.find({ user });
    return works;
  }

  async createWork(workName: string, workTheme: WorkTheme, userName: string) {
    const user = await this.usersService.findUserByUserName(userName);
    const oldWork: Work = await this.findWork(workName, user);
    if (oldWork) {
      throw new WorkAlreadyExistException();
    }
    return this.worksModel.create({ workName, user, workTheme });
  }

  async updateWork(
    workID: string,
    userName: string,
    panoramaTourConfig: PanoramaTourConfig,
  ) {
    const user = await this.usersService.findUserByUserName(userName);
    return this.worksModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(workID), user },
      { panoramaTourConfig },
      { new: true, useFindAndModify: false },
    );
  }
}
