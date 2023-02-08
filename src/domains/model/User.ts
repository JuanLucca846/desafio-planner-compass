import { Schema, model } from "mongoose";

export interface UserInterface {
  firstName: string;
  lastName: string;
  birthDate: Date;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const userSchema = new Schema<UserInterface>({
  firstName: String,
  lastName: String,
  birthDate: Date,
  city: String,
  country: String,
  email: String,
  password: String,
  confirmPassword: String,
});

export const User = model<UserInterface>("User", userSchema);
