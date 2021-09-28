"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkAlreadyExistException = void 0;
const common_1 = require("@nestjs/common");
class WorkAlreadyExistException extends common_1.HttpException {
    constructor() {
        super('Work already exist', common_1.HttpStatus.CONFLICT);
    }
}
exports.WorkAlreadyExistException = WorkAlreadyExistException;
//# sourceMappingURL=work-already-exist.exception.js.map