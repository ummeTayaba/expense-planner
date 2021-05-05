import { Service, Inject } from "typedi";

import { ExpenseModel } from "./../model/expense.model";

import { IExpense } from "./../model/expense.type";

@Service()
export class ExpenseService {
  validateExpense = async (expense: IExpense) => {
    let expenseModel = await ExpenseModel.findOne({ month: expense.month });
    if (expenseModel != null) {
      return true;
    } else {
      return false;
    }
  };
}
