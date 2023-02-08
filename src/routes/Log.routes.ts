import express, { NextFunction, Request, Response } from "express";

const logRouter = express.Router();

logRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log("%s %s ", req.method, req.path);
  next();
});

export default logRouter;