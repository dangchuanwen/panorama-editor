import { Model } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findUserByUserName(userName: string): Promise<UserDocument>;
    grouping(userName: string, group: string): Promise<UserDocument>;
    getGroupMembersByUserName(userName: string): Promise<UserDocument[]>;
    createUser(createUserRequestDto: CreateUserRequestDto): Promise<UserDocument>;
}
