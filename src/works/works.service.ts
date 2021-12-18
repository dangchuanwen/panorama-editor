import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PanoramaTourConfig, Work, WorkDocument } from './schemas/work.schema';
import { WorkAlreadyExistException } from './exceptions/work-already-exist.exception';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { CultureTheme } from 'src/cultureThemes/schemas/cultureTheme.schema';
import { CultureThemesService } from 'src/cultureThemes/cultureThemes.service';

@Injectable()
export class WorksService {
  constructor(
    @InjectModel(Work.name) private readonly worksModel: Model<WorkDocument>,
    private readonly usersService: UsersService,
    private readonly cultureThemesService: CultureThemesService,
  ) {}

  async findWork(workName: string, user: User) {
    return this.worksModel.findOne({ workName, user });
  }

  async findWorkByID(workID: string) {
    return this.worksModel.findById(workID);
  }

  async getUserWorkByID(workID: string) {
    const work = await this.worksModel.findOne({
      _id: mongoose.Types.ObjectId(workID),
    });
    return work;
  }

  async getUserWorks(userName: string) {
    const user = await this.usersService.findUserByUserName(userName);
    const works = await this.worksModel
      .find({ user })
      .populate('user')
      .populate('workTheme')
      .lean();
    return works;
  }

  // 暂时弃用
  async getAllUsersWorks() {
    const usersWithWorks: Array<{
      user: User;
      works: Array<Work>;
    }> = [];

    // 获取所有的作品
    const allWorks = await this.worksModel
      .find()
      .populate('user')
      .populate('workTheme')
      .lean();

    // 根据作者汇总
    allWorks.forEach((work) => {
      const user = usersWithWorks.find(
        (item) => item.user.userName === work.user.userName,
      );
      if (user) {
        user.works.push(work);
      } else {
        usersWithWorks.push({
          user: work.user,
          works: [work],
        });
      }
    });
    return usersWithWorks;
  }

  async createWork(workName: string, userName: string) {
    const user = await this.usersService.findUserByUserName(userName);
    const cultureTheme: CultureTheme =
      await this.cultureThemesService.findCultureThemeByName(user.group);
    const oldWork: Work = await this.findWork(workName, user);
    if (oldWork) {
      throw new WorkAlreadyExistException();
    }
    return this.worksModel.create({
      workName,
      user,
      workTheme: cultureTheme || null,
    });
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

  async getWorkOwner(workdID: string) {
    const work = await this.worksModel
      .findById(workdID)
      .populate('user')
      .lean();
    return work.user || null;
  }

  async removeWork(workdID: string) {
    await this.worksModel.findByIdAndDelete(workdID);
  }
}
