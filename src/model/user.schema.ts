import { Schema } from "mongoose";
import * as mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    password: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
        required: false,
      }
    })
export default UserSchema