"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishedWorkModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../users/user.module");
const works_module_1 = require("../works/works.module");
const publishedWork_controller_1 = require("./publishedWork.controller");
const publishedWork_service_1 = require("./publishedWork.service");
const publishedWork_schema_1 = require("./schemas/publishedWork.schema");
let PublishedWorkModule = class PublishedWorkModule {
};
PublishedWorkModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UsersModule,
            works_module_1.WorksModule,
            mongoose_1.MongooseModule.forFeature([
                { name: publishedWork_schema_1.PublishedWork.name, schema: publishedWork_schema_1.PublishedWorkSchema },
            ]),
        ],
        controllers: [publishedWork_controller_1.PublishedWorkController],
        providers: [publishedWork_service_1.PublishedWorkService],
        exports: [publishedWork_service_1.PublishedWorkService],
    })
], PublishedWorkModule);
exports.PublishedWorkModule = PublishedWorkModule;
//# sourceMappingURL=publishedWorks.module.js.map