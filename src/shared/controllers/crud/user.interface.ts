import { ObjectId } from "@mikro-orm/mongodb";

export interface User {
  _id: ObjectId;
  login: string;
  email?: string;
}
