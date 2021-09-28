export declare class QiniuService {
    AK: string;
    SK: string;
    expires: number;
    options: any;
    deadline: number | null;
    token: string;
    constructor();
    expired(): boolean;
    getQiniuToken(): string;
}
