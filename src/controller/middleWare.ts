import { NextFunction, Request, Response } from "express";

import { connection } from "./../routes/route";

import { UserModel } from "./../model/user.model";
import { ExpenseModel } from "../model/expense.model";

export interface TokenData {
  token: string;
  expiresIn: number;
}
import { verify } from "jsonwebtoken";
//import jwt = require("express-jwt");
export interface DataStoredInToken {
  _id: string;
}
export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await UserModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        response.send("Error Occured");
      }
    } catch (error) {
      response.send("Error Occured");
    }
  } else {
    response.send("Error Occured");
  }
}

export default authMiddleware;
