import { QiniuService } from './qiniu.service';
export declare class QiniuController {
    private readonly qiuNiuService;
    constructor(qiuNiuService: QiniuService);
    getQiNiuToken(): string;
}
