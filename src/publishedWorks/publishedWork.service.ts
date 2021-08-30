import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/user.service';
import { WorksService } from 'src/works/works.service';
import {
  PublishedWork,
  PublishedWorkDocument,
} from './schemas/publishedWork.schema';

@Injectable()
export class PublishedWorkService {
  constructor(
    @InjectModel(PublishedWork.name)
    private readonly publishedWorksModel: Model<PublishedWorkDocument>,
    private readonly usersService: UsersService,
    private readonly worksService: WorksService,
  ) {}

  async findAllPublishedWorks() {
    return this.publishedWorksModel.find({});
  }

  async savePublishedWork(
    userName: string,
    workID: string,
    introduction: string,
  ) {
    const work = await this.worksService.getUserWorkByID(userName, workID);
    const user = await this.usersService.findUserByUserName(userName);
    const oldPublishedWork = await this.publishedWorksModel.findOne({
      work,
      user,
    });
    if (!oldPublishedWork) {
      return this.publishedWorksModel.create({ work, user, introduction });
    } else {
      return this.publishedWorksModel.findByIdAndUpdate(
        oldPublishedWork._id,
        { introduction },
        { new: true, useFindAndModify: false },
      );
    }
  }
}
