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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const publishedWork_service_1 = require("../publishedWorks/publishedWork.service");
const user_service_1 = require("../users/user.service");
const comment_schema_1 = require("./schemas/comment.schema");
const mongoose_3 = require("mongoose");
const no_access_to_delete_exception_1 = require("./exceptions/no-access-to-delete.exception");
let CommentService = class CommentService {
    constructor(commentModel, usersService, publishedWorksService) {
        this.commentModel = commentModel;
        this.usersService = usersService;
        this.publishedWorksService = publishedWorksService;
    }
    async createComment(content, userName, commentedPublishedWorkID) {
        const publisher = await this.usersService.findUserByUserName(userName);
        const commentedPublishedWork = await this.publishedWorksService.findPublishedWorkByID(commentedPublishedWorkID);
        return this.commentModel.create({
            content,
            publisher,
            commentedPublishedWork,
        });
    }
    async getCommentsOfPublishedWork(commentedPublishedWorkID) {
        const commentedPublishedWork = await this.publishedWorksService.findPublishedWorkByID(commentedPublishedWorkID);
        const comments = await this.commentModel.find({ commentedPublishedWork });
        return comments;
    }
    async removeComment(commentID, userName) {
        const publisher = await this.usersService.findUserByUserName(userName);
        const accessToDelete = await this.commentModel.findOne({
            _id: mongoose_3.Types.ObjectId(commentID),
            publisher,
        });
        if (!accessToDelete) {
            throw new no_access_to_delete_exception_1.NoAccessToDeleteException();
        }
        return this.commentModel.deleteOne({ _id: mongoose_3.Types.ObjectId(commentID) });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UsersService,
        publishedWork_service_1.PublishedWorkService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map