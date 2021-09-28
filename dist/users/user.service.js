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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const user_already_exist_exception_1 = require("./exceptions/user-already-exist.exception");
const bcrypt = require("bcrypt");
const constants_1 = require("../auth/constants");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findUserByUserName(userName) {
        return this.userModel.findOne({ userName });
    }
    async grouping(userName, group) {
        return this.userModel.findOneAndUpdate({ userName }, { $set: { group } });
    }
    async getGroupMembersByUserName(userName) {
        let groupMembers = [];
        const user = await this.findUserByUserName(userName);
        const group = user.group;
        if (group === null) {
            return groupMembers;
        }
        groupMembers = await this.userModel.find({ group });
        return groupMembers;
    }
    async createUser(createUserRequestDto) {
        const oldUser = await this.findUserByUserName(createUserRequestDto.userName);
        if (oldUser) {
            throw new user_already_exist_exception_1.UserAlreadyExistException();
        }
        const hash = await bcrypt.hash(createUserRequestDto.password, constants_1.saltOrRounds);
        const user = await this.userModel.create({
            userName: createUserRequestDto.userName,
            password: hash,
            gender: createUserRequestDto.gender,
            country: createUserRequestDto.country,
        });
        return user;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map