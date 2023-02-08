import { Model } from "mongoose";
import { User, UserInterface } from "../domains/model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserService {
  private userRepository: Model<UserInterface>;
  private readonly secret: string;

  constructor() {
    this.userRepository = User;
    if (!process.env.SECRET) {
      throw "SECRET env is mandatory";
    }
    this.secret = process.env.SECRET;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ email: email });
  }

  async create(firstName: string, lastName: string, birthDate: Date, city: string, country: string, email: string, password: string) {
    try {
      const checkEmail = await this.findByEmail(email);
      if (checkEmail) {
        throw "User already exists!";
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      let user = new User({
        firstName,
        lastName,
        birthDate,
        city,
        country,
        email,
        password: passwordHash,
      });

      await user.save();
      user.password = "";
      return user;
    } catch (e) {
      const msg = `Unable to create user: ${e}`;
      console.error(msg);
      throw msg;
    }
  }

  async update(
    id: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    city: string,
    country: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    try {
      let updateUser = await this.userRepository.findById(id);
      if (!updateUser) {
        throw "User not found!";
      }

      if (password !== confirmPassword) {
        throw "error!";
      }

      const checkEmail = await this.findByEmail(email);
      if (checkEmail) {
        throw "Email already exists!";
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await updateUser.updateOne({
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        city: city,
        country: country,
        email: email,
        password: passwordHash,
      });

      return await this.userRepository.findById(id, { password: 0 });
    } catch (e) {
      const msg = `Error to update user: ${e}`;
      console.error(msg);
      throw msg;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ email: email });
      if (!user) {
        throw "User not found!";
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw "Invalid password!";
      }

      user.password = "";
      return jwt.sign({ user }, this.secret, { expiresIn: "1d" });
    } catch (e) {
      const msg = `Unable to authenticate user: ${e}`;
      console.error(msg);
      throw msg;
    }
  }
}
