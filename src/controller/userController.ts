import { Request, Response } from "express";

import { connection } from "./../routes/route";
import * as bcrypt from "bcrypt";
import { UserModel } from "./../model/user.model";
import { ExpenseModel } from "../model/expense.model";
import { TokenData } from "./middleWare";
import { DataStoredInToken } from "./middleWare";

import { IUserDocument } from "../model/user.type";
import { sign } from "jsonwebtoken";
import express = require("express");
const nodemailer = require("nodemailer");
/*{
    name: "Shabab Karim",
    phoneNumber: "01670737626",
    email: "shababkarim93@gmail.com",
    password: "123",
  }
  */
let createToken = async (user: IUserDocument): Promise<TokenData> => {
  const expiresIn = 60 * 60; // an hour
  const secret = process.env.JWT_SECRET;
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id,
  };
  return {
    expiresIn,
    token: sign(dataStoredInToken, secret, { expiresIn }),
  };
};

export let allUsers = async (req: Request, res: Response) => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  console.log("The current month is " + monthNames[d.getMonth()]);
  const expenses = await ExpenseModel.find(
    {
      month: { $in: [monthNames[d.getMonth()]] },
    },
    async (err, allExpenses) => {
      if (err) {
        res.status(422);
        res.send(err); // Failure
      }
      if (expenses == null) {
        let messageOptions = {
          from: "your_demo_email_address@example.com",
          to: "user@example.com",
          subject: "Scheduled Email",
          text: "Hi there. This email was automatically sent by us.",
        };
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });

        transporter.sendMail(messageOptions, function (error: any, info: any) {
          if (error) {
            throw error;
          } else {
            console.log("Email successfully sent!");
          }
        });
      }
    }
  );
};

export let reminderEmail = (req: Request, res: Response) => {
  let users = UserModel.find((err: any, users: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};

export let login = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  const data = {
    username: req.body.email,
    password: req.body.password,
  };
  UserModel.findOne(data, function (err: any, user: any) {
    if (err) {
      res.json({
        status: 0,
        message: err,
      });
    }
    if (!user) {
      res.json({
        status: 0,
        msg: "User not found",
      });
    }
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        data.password,
        user.password
      );
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
        res.send(user);
      }
    }
  });
};

export let addUser = (req: Request, res: Response) => {
  let user = new UserModel({
    name: "Shabab Karim",
    phoneNumber: "01670737626",
    email: "shababkarim93@gmail.com",
    password: "123",
  });

  user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};
