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
import { CultureThemesService } from 'src/cultureThemes/cultureThemes.service';

@Injectable()
export class PublishedWorkService {
  constructor(
    @InjectModel(PublishedWork.name)
    private readonly publishedWorksModel: Model<PublishedWorkDocument>,
    private readonly usersService: UsersService,
    private readonly worksService: WorksService,
    private readonly cultureThemesService: CultureThemesService,
  ) {}

  async removePublishedWorksByWorkID(workID: string) {
    const work = await this.worksService.findWorkByID(workID);
    return this.publishedWorksModel.deleteMany({
      work,
    });
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
    culturethemesNames: string[],
  ) {
    if (culturethemesNames.length === 0) {
      const allCultureThemes =
        await this.cultureThemesService.findAllCultureThemes();
      const allCultureThemesNames = allCultureThemes.map((item) => {
        return item.name;
      });
      culturethemesNames = allCultureThemesNames;
    }
    return this.publishedWorksModel.aggregate([
      {
        $match: { createdTime: { $lt: anchorDate } },
      },
      {
        $sort: {
          createdTime: -1,
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
        $match: {
          $and: [
            { 'work.workTheme': { $ne: null } },
            { 'work.workTheme': { $ne: '' } },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },

      {
        $lookup: {
          from: 'culturethemes',
          localField: 'work.workTheme',
          foreignField: '_id',
          as: 'work.workTheme',
        },
      },
      {
        $unwind: '$work.workTheme',
      },
      {
        $match: {
          'work.workTheme.name': { $in: culturethemesNames },
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
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.publisher',
          foreignField: '_id',
          as: 'comments.publisher',
        },
      },
      {
        $unwind: {
          path: '$comments.publisher',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $limit: dataCount,
      },
      {
        $group: {
          _id: '$_id',
          publishedWork: { $first: '$$ROOT' },
          comments: { $push: '$comments' },
        },
      },
      {
        $sort: {
          'publishedWork.createdTime': -1,
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

  async savePublishedWork(
    userName: string,
    workID: string,
    introduction: string,
  ) {
    const work = await this.worksService.getUserWorkByID(workID);
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
    const user = await this.usersService.getUserByUsername(userName);
    let groupMembers: UserDocument[];
    let groupMembersObjectIDs: mongoose.Types.ObjectId[];
    groupMembers = await this.usersService.getGroupMembersByUserName(userName);
    groupMembers = groupMembers.filter(
      (member) =>
        member.userName === userName || member.country !== user.country,
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
        $match: {
          $and: [
            { 'work.workTheme': { $ne: null } },
            { 'work.workTheme': { $ne: '' } },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },

      {
        $lookup: {
          from: 'culturethemes',
          localField: 'work.workTheme',
          foreignField: '_id',
          as: 'work.workTheme',
        },
      },
      {
        $unwind: '$work.workTheme',
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
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.publisher',
          foreignField: '_id',
          as: 'comments.publisher',
        },
      },
      {
        $unwind: {
          path: '$comments.publisher',
          preserveNullAndEmptyArrays: true,
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
        $sort: {
          'publishedWork.createdTime': -1,
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
