import { Schema } from "mongoose";
import * as mongoose from 'mongoose';
const expenseSchema=new mongoose.Schema({
    expenseType: {
        type: String,
        trim: true,
        required: true,
    },
    cost:{
        type: String,
        trim: true,
        required: true,
    },
    expenseDate:{
      type: Date,
      trim: true,
      required: true,
    },
    month:{
      type: String,
      trim: true,
      required: true,
    },
    year:{
        type: String,
        trim: true,
        required: true,
    }

})
export default expenseSchema