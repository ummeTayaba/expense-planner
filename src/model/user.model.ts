  
import { model } from "mongoose";
import { IUserDocument } from "./user.type"
import UserSchema from "./user.schema"
import * as mongoose from 'mongoose';

export const UserModel = mongoose.model<IUserDocument>("user", UserSchema)