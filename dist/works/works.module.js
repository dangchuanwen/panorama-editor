"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const work_schema_1 = require("./schemas/work.schema");
const works_controller_1 = require("./works.controller");
const works_service_1 = require("./works.service");
let WorksModule = class WorksModule {
};
WorksModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: work_schema_1.Work.name, schema: work_schema_1.WorksSchema }]),
        ],
        controllers: [works_controller_1.WorksController],
        providers: [works_service_1.WorksService],
        exports: [works_service_1.WorksService],
    })
], WorksModule);
exports.WorksModule = WorksModule;
//# sourceMappingURL=works.module.js.map