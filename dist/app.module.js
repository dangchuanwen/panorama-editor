"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./users/user.module");
const auth_module_1 = require("./auth/auth.module");
const works_module_1 = require("./works/works.module");
const qiniu_module_1 = require("./qiniu/qiniu.module");
const publishedWorks_module_1 = require("./publishedWorks/publishedWorks.module");
const comment_module_1 = require("./comment/comment.module");
const language_module_1 = require("./language/language.module");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const MongodbURLMaps = new Map();
MongodbURLMaps.set('prod', 'mongodb://mongo:27017/panorama');
MongodbURLMaps.set('dev', 'mongodb://localhost:27017/panorama');
const mongodb_url = MongodbURLMaps.get(process.env.NODE_ENV);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(mongodb_url),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'client'),
            }),
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            works_module_1.WorksModule,
            publishedWorks_module_1.PublishedWorkModule,
            qiniu_module_1.QiniuModule,
            comment_module_1.CommentModule,
            language_module_1.LanguageModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map