import { Controller, Get } from '@nestjs/common';
import { QiniuService } from './qiniu.service';

@Controller('qiniu')
export class QiniuController {
  constructor(private readonly qiuNiuService: QiniuService) {}
  @Get('token')
  getQiNiuToken(): string {
    return this.qiuNiuService.getQiniuToken();
  }
}
