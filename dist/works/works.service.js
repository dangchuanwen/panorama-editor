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
exports.WorksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const work_schema_1 = require("./schemas/work.schema");
const work_already_exist_exception_1 = require("./exceptions/work-already-exist.exception");
const user_service_1 = require("../users/user.service");
const user_schema_1 = require("../users/schemas/user.schema");
const mongoose = require("mongoose");
let WorksService = class WorksService {
    constructor(worksModel, usersService) {
        this.worksModel = worksModel;
        this.usersService = usersService;
    }
    async findWork(workName, user) {
        return this.worksModel.findOne({ workName, user });
    }
    async findWorkByID(workID) {
        return this.worksModel.findById(workID);
    }
    async getUserWorkByID(workID) {
        const work = await this.worksModel.findOne({
            _id: mongoose.Types.ObjectId(workID),
        });
        return work;
    }
    async getUserWorks(userName) {
        const user = await this.usersService.findUserByUserName(userName);
        const works = await this.worksModel.find({ user });
        return works;
    }
    async createWork(workName, workTheme, userName) {
        const user = await this.usersService.findUserByUserName(userName);
        const oldWork = await this.findWork(workName, user);
        if (oldWork) {
            throw new work_already_exist_exception_1.WorkAlreadyExistException();
        }
        return this.worksModel.create({ workName, user, workTheme });
    }
    async updateWork(workID, userName, panoramaTourConfig) {
        const user = await this.usersService.findUserByUserName(userName);
        return this.worksModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(workID), user }, { panoramaTourConfig }, { new: true, useFindAndModify: false });
    }
    async getWorkOwner(workdID) {
        const work = await this.worksModel
            .findById(workdID)
            .populate('user')
            .lean();
        return work.user || null;
    }
    async removeWork(workdID) {
        await this.worksModel.findByIdAndDelete(workdID);
    }
};
WorksService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(work_schema_1.Work.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UsersService])
], WorksService);
exports.WorksService = WorksService;
//# sourceMappingURL=works.service.js.map