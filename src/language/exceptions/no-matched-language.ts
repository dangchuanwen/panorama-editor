import { HttpException, HttpStatus } from '@nestjs/common';

export class NoMatchedLanguage extends HttpException {
  constructor() {
    super('No Matched Language', HttpStatus.NOT_FOUND);
  }
}
