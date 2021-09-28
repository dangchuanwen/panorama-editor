"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAccessToDeleteException = void 0;
const common_1 = require("@nestjs/common");
class NoAccessToDeleteException extends common_1.HttpException {
    constructor() {
        super('Delete denied', common_1.HttpStatus.FORBIDDEN);
    }
}
exports.NoAccessToDeleteException = NoAccessToDeleteException;
//# sourceMappingURL=no-access-to-delete.exception.js.map