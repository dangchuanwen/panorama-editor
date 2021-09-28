"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishedWorkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const user_service_1 = require("../users/user.service");
const works_service_1 = require("../works/works.service");
const mongoose = require("mongoose");
const publishedWork_schema_1 = require("./schemas/publishedWork.schema");
let PublishedWorkService = class PublishedWorkService {
    constructor(publishedWorksModel, usersService, worksService) {
        this.publishedWorksModel = publishedWorksModel;
        this.usersService = usersService;
        this.worksService = worksService;
        this.aggregateArray = [];
        this.aggregateArray = [
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
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$publishedWork', { comments: '$comments' }],
                    },
                },
            },
            {
                $sort: {
                    createdTime: -1,
                },
            },
        ];
    }
    async findAllPublishedWorks() {
        return this.publishedWorksModel.aggregate(this.aggregateArray);
    }
    async findPublishedWorkByID(publishedWorkID) {
        const publishedWork = await this.publishedWorksModel.findById(publishedWorkID);
        return publishedWork;
    }
    async findUserPublishedWorkByWorkID(userName, workID) {
        const user = await this.usersService.findUserByUserName(userName);
        const work = await this.worksService.findWorkByID(workID);
        return this.publishedWorksModel.findOne({ user, work });
    }
    async findPublishedWorksBeforeAnchorDate(anchorDate, dataCount) {
        const date = new Date(Number(anchorDate));
        return this.publishedWorksModel.aggregate([
            {
                $match: { createdTime: { $lt: date } },
            },
            {
                $limit: dataCount,
            },
            ...this.aggregateArray,
        ]);
    }
    async savePublishedWork(userName, workID, introduction) {
        const work = await this.worksService.getUserWorkByID(workID);
        const user = await this.usersService.findUserByUserName(userName);
        const oldPublishedWork = await this.publishedWorksModel.findOne({
            work,
            user,
        });
        if (!oldPublishedWork) {
            return this.publishedWorksModel.create({ work, user, introduction });
        }
        else {
            return this.publishedWorksModel.findByIdAndUpdate(oldPublishedWork._id, { introduction }, { new: true, useFindAndModify: false });
        }
    }
    async getPublishedWorksOfGroupMembersByUserName(userName) {
        let groupMembers;
        let groupMembersObjectIDs;
        groupMembers = await this.usersService.getGroupMembersByUserName(userName);
        groupMembers = groupMembers.filter((member) => member.userName !== userName);
        groupMembersObjectIDs = groupMembers.map((groupMember) => mongoose.Types.ObjectId(groupMember._id));
        return this.publishedWorksModel.aggregate([
            {
                $match: {
                    user: {
                        $in: groupMembersObjectIDs,
                    },
                },
            },
            ...this.aggregateArray,
        ]);
    }
};
PublishedWorkService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(publishedWork_schema_1.PublishedWork.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UsersService,
        works_service_1.WorksService])
], PublishedWorkService);
exports.PublishedWorkService = PublishedWorkService;
//# sourceMappingURL=publishedWork.service.js.map