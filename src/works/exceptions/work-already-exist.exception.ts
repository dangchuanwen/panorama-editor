import { HttpException, HttpStatus } from '@nestjs/common';

export class WorkAlreadyExistException extends HttpException {
  constructor() {
    super('Work already exist', HttpStatus.CONFLICT);
  }
}
