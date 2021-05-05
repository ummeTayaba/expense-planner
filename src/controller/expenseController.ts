import { Request, Response } from "express";

import { Service, Inject } from "typedi";

import { connection } from "./../routes/route";

import { ExpenseModel } from "./../model/expense.model";

import * as express from "express";

import { ExpenseService } from "./../service/expenseService";
@Service()
export class ExpenseController {
  @Inject()
  private expenseService: ExpenseService;

  allExpenses = async (req: Request, res: Response) => {
    let expenses = await ExpenseModel.find((err: any, users: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(expenses);
      }
    });
  };

  generateReport = async (req: Request, res: Response) => {
    const expenses = await ExpenseModel.find(
      {
        month: { $in: [req.params.month] },
      },
      (err, allExpenses) => {
        if (err) {
          res.status(422);
          res.send(err); // Failure
        }
      }
    );
    if (expenses == null) {
      res.send("No data found for the month " + req.params.month);
    }
    let sum = 0;
    expenses.map((expense) => {
      sum = sum + parseInt(expense.cost);
    });
    let averageExpense = sum / 30;

    res.send(
      "Your total Expense for the Month of " +
        req.params.month +
        " is " +
        sum +
        " and your average daily expense is " +
        averageExpense
    );
  };

  addExpense = async (req: Request, res: Response) => {
    let expenseExists = await this.expenseService.validateExpense(req.body);
    if (!expenseExists) {
      let expense = new ExpenseModel(req.body);

      expense.save((err: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(expense);
        }
      });
    }
    res.status(422).send({
      data: req.body,
      errors: "cannot create another Expense Record in the same month",
    });
  };

  removeExpense = (req: Request, res: Response) => {
    ExpenseModel.deleteOne({ _id: req.params.id })
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  };

  updateExpense = (req: Request, res: Response) => {
    ExpenseModel.findByIdAndUpdate(req.params.id, req.body)
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  };
  static ExpenseController: any;
}
