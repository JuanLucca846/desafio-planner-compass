import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserInterface } from "../../domains/model/User";

interface Payload {
  user: UserInterface;
}

export function userAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "Error token not defined" });
  }

  try {
    if (process.env.SECRET === undefined) {
      return res.json({ msg: "Error" });
    }

    const { user } = verify(token, process.env.SECRET) as Payload;

    req.user = user;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
}
