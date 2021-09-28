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
exports.PublishedWorkController = void 0;
const common_1 = require("@nestjs/common");
const jwt_dto_1 = require("../auth/dto/jwt.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const getPublishedWorkByID_dto_1 = require("./dto/getPublishedWorkByID.dto");
const getPublishedWorksBeforeAnchorDate_dto_1 = require("./dto/getPublishedWorksBeforeAnchorDate.dto");
const publishWork_dto_1 = require("./dto/publishWork.dto");
const publishedWork_service_1 = require("./publishedWork.service");
let PublishedWorkController = class PublishedWorkController {
    constructor(publishedWorkService) {
        this.publishedWorkService = publishedWorkService;
    }
    async getPublishedWorksOfGroupMembers(req) {
        return this.publishedWorkService.getPublishedWorksOfGroupMembersByUserName(req.user.userName);
    }
    async getPublishedWorksBeforeAnchorDate(params) {
        return this.publishedWorkService.findPublishedWorksBeforeAnchorDate(params.anchorDate, Number(params.dataCount));
    }
    async getAllPublishedWorks() {
        return this.publishedWorkService.findAllPublishedWorks();
    }
    async getPublishedWorkByID(params, req) {
        const { workID } = params;
        const { user: { userName }, } = req;
        return this.publishedWorkService.findUserPublishedWorkByWorkID(userName, workID);
    }
    async publishWork(body, req) {
        const { introduction, workID } = body;
        return this.publishedWorkService.savePublishedWork(req.user.userName, workID, introduction);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('group'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublishedWorkController.prototype, "getPublishedWorksOfGroupMembers", null);
__decorate([
    common_1.Get('before/:anchorDate/count/:dataCount'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getPublishedWorksBeforeAnchorDate_dto_1.GetPublishedWorksBeforeAnchorDate]),
    __metadata("design:returntype", Promise)
], PublishedWorkController.prototype, "getPublishedWorksBeforeAnchorDate", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublishedWorkController.prototype, "getAllPublishedWorks", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:workID'),
    __param(0, common_1.Param()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getPublishedWorkByID_dto_1.GetPublishedWorkByIDDto, Object]),
    __metadata("design:returntype", Promise)
], PublishedWorkController.prototype, "getPublishedWorkByID", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publishWork_dto_1.PublishWorkDto, Object]),
    __metadata("design:returntype", Promise)
], PublishedWorkController.prototype, "publishWork", null);
PublishedWorkController = __decorate([
    common_1.Controller('published-works'),
    __metadata("design:paramtypes", [publishedWork_service_1.PublishedWorkService])
], PublishedWorkController);
exports.PublishedWorkController = PublishedWorkController;
//# sourceMappingURL=publishedWork.controller.js.map