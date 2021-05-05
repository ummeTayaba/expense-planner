import * as mongoose from "mongoose";

const MongoClient = require("mongodb").MongoClient;
const mongoAtlasUri =
  "mongodb+srv://ExpenseDb:Helloworld477@cluster0.kczf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const connection = mongoose.connect(mongoAtlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoCreate: true,
});
