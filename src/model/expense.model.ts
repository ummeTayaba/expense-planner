import { model } from "mongoose";
import { IExpenseDocument } from "./expense.type";
import expenseSchema from "./expense.schema";
import * as mongoose from "mongoose";

export const ExpenseModel = mongoose.model<IExpenseDocument>(
  "expense",
  expenseSchema
);
