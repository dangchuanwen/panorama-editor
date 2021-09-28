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
exports.WorksController = void 0;
const common_1 = require("@nestjs/common");
const jwt_dto_1 = require("../auth/dto/jwt.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_work_dto_1 = require("./dto/create-work.dto");
const update_work_dto_1 = require("./dto/update-work.dto");
const work_schema_1 = require("./schemas/work.schema");
const works_service_1 = require("./works.service");
let WorksController = class WorksController {
    constructor(worksService) {
        this.worksService = worksService;
    }
    async getWorkThemeList() {
        return Object.values(work_schema_1.WorkTheme);
    }
    async getWorks(req) {
        return this.worksService.getUserWorks(req.user.userName);
    }
    async getWork(workID) {
        return this.worksService.getUserWorkByID(workID);
    }
    async createWork(req, body) {
        return this.worksService.createWork(body.workName, body.workTheme, req.user.userName);
    }
    async updateWork(req, body) {
        return this.worksService.updateWork(body.workID, req.user.userName, body.panoramaTourConfig);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/theme-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "getWorkThemeList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "getWorks", null);
__decorate([
    common_1.Get('/:workID'),
    __param(0, common_1.Param('workID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "getWork", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_work_dto_1.CreateWorkDto]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "createWork", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_work_dto_1.UpdateWorkDto]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "updateWork", null);
WorksController = __decorate([
    common_1.Controller('works'),
    __metadata("design:paramtypes", [works_service_1.WorksService])
], WorksController);
exports.WorksController = WorksController;
//# sourceMappingURL=works.controller.js.map