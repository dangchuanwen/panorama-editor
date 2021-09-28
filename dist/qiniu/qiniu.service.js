"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QiniuService = void 0;
const common_1 = require("@nestjs/common");
const qiniu = require("qiniu");
let QiniuService = class QiniuService {
    constructor() {
        this.AK = 'sKboHAqetiQc0KMCUTnxvBjn7zgsi2Nr8WaxFMsI';
        this.SK = 'kh6ZZC-uXEzWydkY5jaTu_mIETw5_CDfUFUeRx5R';
        this.expires = 86400;
        this.options = {
            scope: 'panorama-images',
            expires: 86400,
        };
        this.deadline = null;
        this.token = '';
    }
    expired() {
        return this.deadline === null || this.deadline < Date.now();
    }
    getQiniuToken() {
        if (this.expired()) {
            this.deadline = Date.now() + this.expires * 1000;
            const mac = new qiniu.auth.digest.Mac(this.AK, this.SK);
            const putPolicy = new qiniu.rs.PutPolicy(this.options);
            const uploadToken = putPolicy.uploadToken(mac);
            this.token = uploadToken;
        }
        return this.token;
    }
};
QiniuService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], QiniuService);
exports.QiniuService = QiniuService;
//# sourceMappingURL=qiniu.service.js.map