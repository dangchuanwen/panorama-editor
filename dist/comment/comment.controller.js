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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_dto_1 = require("../auth/dto/jwt.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const comment_service_1 = require("./comment.service");
const comment_dto_1 = require("./dto/comment.dto");
const comments_of_published_work_dto_1 = require("./dto/comments-of-published-work.dto");
const delete_comment_dto_1 = require("./dto/delete-comment.dto");
let CommentController = class CommentController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async comment(req, body) {
        return this.commentsService.createComment(body.content, req.user.userName, body.commentedPublishedWorkID);
    }
    async getCommentsOfPublishedWork(query) {
        return this.commentsService.getCommentsOfPublishedWork(query.publishedWorkID);
    }
    async deleteComment(params, req) {
        return this.commentsService.removeComment(params.commentID, req.user.userName);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "comment", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comments_of_published_work_dto_1.GetCommentsOfPublishedWorkDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsOfPublishedWork", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:commentID'),
    __param(0, common_1.Param()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_comment_dto_1.DeleteCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
CommentController = __decorate([
    common_1.Controller('comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map