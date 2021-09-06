import { HttpException, HttpStatus } from '@nestjs/common';

export class NoAccessToDeleteException extends HttpException {
  constructor() {
    super('Delete denied', HttpStatus.FORBIDDEN);
  }
}
