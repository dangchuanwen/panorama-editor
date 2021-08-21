import { Injectable } from '@nestjs/common';
import * as qiniu from 'qiniu';

@Injectable()
export class QiniuService {
  AK = 'sKboHAqetiQc0KMCUTnxvBjn7zgsi2Nr8WaxFMsI';
  SK = 'kh6ZZC-uXEzWydkY5jaTu_mIETw5_CDfUFUeRx5R';
  expires: number = 86400;
  options: any = {
    scope: 'panorama-images',
    expires: 86400,
  };
  deadline: number | null = null;
  token: string = '';

  constructor() {}
  expired(): boolean {
    return this.deadline === null || this.deadline < Date.now();
  }

  getQiniuToken(): string {
    if (this.expired()) {
      this.deadline = Date.now() + this.expires * 1000;
      const mac = new qiniu.auth.digest.Mac(this.AK, this.SK);
      const putPolicy = new qiniu.rs.PutPolicy(this.options);
      const uploadToken = putPolicy.uploadToken(mac);
      this.token = uploadToken;
    }
    return this.token;
  }
}
