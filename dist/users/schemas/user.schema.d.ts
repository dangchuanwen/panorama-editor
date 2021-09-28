import { Document, Schema as mongooseSchema } from 'mongoose';
export declare type UserDocument = User & Document;
export declare enum Gender {
    Male = 0,
    Female = 1
}
export declare enum Country {
    China = 0,
    Uzbekistan = 1,
    Indonesia = 2
}
export declare class User {
    userName: string;
    password: string;
    gender: Gender;
    country: Country;
    group: string;
    createdTime: Date;
}
export declare const UserSchema: mongooseSchema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any>, undefined, {}>;
