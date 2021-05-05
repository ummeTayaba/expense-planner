import { Document, Model } from "mongoose"

export interface IUser {
    
    password: string,
    name: string,
    email: string,
    
    phoneNumber: string
}

export interface IUserDocument extends IUser, Document { }
export interface IUserModel extends Model<IUserDocument> { }