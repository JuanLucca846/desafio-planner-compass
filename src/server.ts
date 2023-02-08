import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/User.routes";
import eventRoutes from "./routes/Event.routes";
import logRouter from "./routes/Log.routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

try {
  const startServer = async () => {
    const server = express();

    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: "Planner",
          version: "1.0.0",
        },
      },
      apis: ["./src/routes/documentation/*swagger.ts"],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

    server.use(express.json());
    server.use(logRouter);
    server.use(userRoutes);
    server.use(eventRoutes);

    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASS;
    const portServer = process.env.PORT;

    if (!dbUser || !dbPassword || !portServer) {
      throw "DB_USER, DB_PASS and PORT envs is mandatory";
    }

    await mongoose
      .set("strictQuery", false)
      .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ydeiwao.mongodb.net/?retryWrites=true&w=majority`);

    server.listen(portServer);
    console.log(`Connected ${portServer}`);
  };

  startServer();
} catch (e) {
  const msg = `Falha ao iniciar o server`;
  console.error(msg, e);
}
