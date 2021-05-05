import "reflect-metadata";
const cron = require("node-cron");
import * as express from "express";

import { Container } from "typedi";

import expenseSchema from "./model/expense.schema";
import { connection } from "./routes/route";

import { allUsers } from "./controller/userController";
import { addUser } from "./controller/userController";

import { reminderEmail } from "./controller/userController";

import { ExpenseController } from "./controller/expenseController";
import { authMiddleware } from "./controller/middleWare";
const app = express();
const port = 3000;

app.set("port", 3000);

const expenseController = Container.get(ExpenseController);

app.get("/", (req: any, res: any) => {
  res.send("Hello User");
});
var CronJob = require("cron").CronJob;
cron.schedule("0 0 28 * *", function () {
  console.log("---------------------");
  console.log("Running Cron Job");
  app.get("/sendReminderEmail", reminderEmail);
});
app.get("/users", allUsers);
app.get("/adduser", addUser);
app.get("/expenses", authMiddleware, expenseController.allExpenses);
app.get("/addExpense", expenseController.addExpense);
app.get("/removeExpense", expenseController.removeExpense);
app.get("/updateExpense", expenseController.updateExpense);

connection
  .then(() => {
    app.listen(app.get("port"), () => {
      console.log(`app is listening at port ${port}`);
    });
  })
  .catch((e) => {
    console.log(`There was an error in Database`);
  });
