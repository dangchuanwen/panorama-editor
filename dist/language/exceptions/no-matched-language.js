"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoMatchedLanguage = void 0;
const common_1 = require("@nestjs/common");
class NoMatchedLanguage extends common_1.HttpException {
    constructor() {
        super('No Matched Language', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NoMatchedLanguage = NoMatchedLanguage;
//# sourceMappingURL=no-matched-language.js.map