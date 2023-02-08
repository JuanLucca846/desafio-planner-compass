import { userAuth } from "./middleware/userAuth";
import express, { Router, Request, Response } from "express";
import { createUserSchema } from "../domains/shemas/user/CreateUser.schema";
import { createValidator } from "express-joi-validation";
import { updateUserSchema } from "../domains/shemas/user/UpdateUser.schema";
import { updateParamsSchema } from "../domains/shemas/user/UpdateParams.schema";
import UserService from "../service/User.service";

const userService = new UserService();
const userRoutes: Router = express.Router();
const validator = createValidator();

userRoutes.put(
  "/api/v1/user/:id",
  validator.body(updateUserSchema),
  validator.params(updateParamsSchema),
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { firstName, lastName, birthDate, city, country, email, password, confirmPassword } = req.body;

      const updateUser = await userService.update(id, firstName, lastName, birthDate, city, country, email, password, confirmPassword);

      return res.json(updateUser);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ status: 400, msg: e });
    }
  }
);

userRoutes.post("/api/v1/users/signUp", validator.body(createUserSchema), async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, birthDate, city, country, email, password } = req.body;

    const newUser = await userService.create(firstName, lastName, birthDate, city, country, email, password);
    return res.json(newUser);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, msg: e });
  }
});

userRoutes.post("/api/v1/users/signIn", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userService.signIn(email, password);
    return res.json({ msg: "You are successfully logged in", token });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, msg: e });
  }
});

export default userRoutes;
