"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistException = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExistException extends common_1.HttpException {
    constructor() {
        super('User already exist', common_1.HttpStatus.CONFLICT);
    }
}
exports.UserAlreadyExistException = UserAlreadyExistException;
//# sourceMappingURL=user-already-exist.exception.js.map