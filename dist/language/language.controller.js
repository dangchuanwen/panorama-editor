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
exports.LanguageController = void 0;
const common_1 = require("@nestjs/common");
const getLanguagePackage_dto_1 = require("./dto/getLanguagePackage.dto");
const no_matched_language_1 = require("./exceptions/no-matched-language");
const ChineseTexts_1 = require("./packages/ChineseTexts");
const EnglishTexts_1 = require("./packages/EnglishTexts");
let LanguageController = class LanguageController {
    getLanguagePackage({ languageName }) {
        let languagePackage;
        switch (languageName) {
            case getLanguagePackage_dto_1.LanguageNames.cn:
                languagePackage = ChineseTexts_1.ChineseTexts;
                break;
            case getLanguagePackage_dto_1.LanguageNames.en:
                languagePackage = EnglishTexts_1.EnglishTexts;
                break;
            default:
                throw new no_matched_language_1.NoMatchedLanguage();
        }
        return languagePackage;
    }
};
__decorate([
    common_1.Get('/:languageName'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getLanguagePackage_dto_1.GetLanguagePackageDto]),
    __metadata("design:returntype", Object)
], LanguageController.prototype, "getLanguagePackage", null);
LanguageController = __decorate([
    common_1.Controller('languages')
], LanguageController);
exports.LanguageController = LanguageController;
//# sourceMappingURL=language.controller.js.map