import { Document, Model } from "mongoose"

export interface IExpense {
    
    expenseType: string,
    cost: string,
    expenseDate: Date,
    
    month: string,
    year: string
}

export interface IExpenseDocument extends IExpense, Document { }
export interface IExpenseModel extends Model<IExpenseDocument> { }