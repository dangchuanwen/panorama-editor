import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/user.service';
import { WorksService } from 'src/works/works.service';
import * as mongoose from 'mongoose';
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

  async findPublishedWorkByID(publishedWorkID: string) {
    const publishedWork = await this.publishedWorksModel.findById(
      publishedWorkID,
    );
    return publishedWork;
  }

  async findUserPublishedWorkByWorkID(userName: string, workID: string) {
    const user = await this.usersService.findUserByUserName(userName);
    const work = await this.worksService.findWorkByID(workID);
    return this.publishedWorksModel.findOne({ user, work });
  }

  async findPublishedWorksBeforeAnchorDate(
    anchorDate: Date,
    dataCount: number,
  ) {
    return this.publishedWorksModel
      .find({ createdTime: { $lt: anchorDate } })
      .populate('user')
      .populate('work')
      .sort({ createdTime: -1 })
      .limit(dataCount);
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

  async getPublishedWorksOfGroupMembersByUserName(
    userName: string,
  ): Promise<PublishedWorkDocument[]> {
    let groupMembers: UserDocument[];
    let groupMembersObjectIDs: mongoose.Types.ObjectId[];
    groupMembers = await this.usersService.getGroupMembersByUserName(userName);
    groupMembers = groupMembers.filter(
      (member) => member.userName !== userName,
    );
    groupMembersObjectIDs = groupMembers.map((groupMember) =>
      mongoose.Types.ObjectId(groupMember._id),
    );
    return this.publishedWorksModel.aggregate([
      {
        $match: {
          user: {
            $in: groupMembersObjectIDs,
          },
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'commentedPublishedWork',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'works',
          localField: 'work',
          foreignField: '_id',
          as: 'work',
        },
      },
      {
        $unwind: '$work',
      },
      {
        $sort: {
          createdTime: -1,
        },
      },
      {
        $unwind: '$comments',
      },
      {
        $sort: {
          'comments.createdTime': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          comments: { $push: '$comments' },
          publishedWork: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$publishedWork', { comments: '$comments' }],
          },
        },
      },
    ]);
  }
}
