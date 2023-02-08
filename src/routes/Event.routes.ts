import { userAuth } from "./middleware/userAuth";
import express, { Request, Response, Router } from "express";
import { createValidator } from "express-joi-validation";
import { updateParamsSchema } from "../domains/shemas/user/UpdateParams.schema";
import { createEventSchema } from "../domains/shemas/event/CreateEvent.schema";
import { updateEventSchema } from "../domains/shemas/event/UpdateEvent.schema";
import { deleteParamsSchema } from "../domains/shemas/event/DeleteParams.schema";
import EventService from "../service/Event.service";

const eventsRoutes: Router = express.Router();
const validator = createValidator();

const eventService = new EventService();

eventsRoutes.get("/api/v1/events", userAuth, async (req: Request, res: Response) => {
  try {
    const dayOfTheWeek = req.query.dayOfTheWeek as string | undefined;

    if (dayOfTheWeek) {
      let events = await eventService.findByCreatedAt(dayOfTheWeek);
      return res.status(200).json({ events });
    }

    const events = await eventService.find();
    return res.status(200).json({ events });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, msg: e });
  }
});

eventsRoutes.get("/api/v1/events/:id", userAuth, validator.params(updateParamsSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findEvent = await eventService.findById(id);

    return res.json({ findEvent });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, msg: e });
  }
});

eventsRoutes.post("/api/v1/events", validator.body(createEventSchema), userAuth, async (req: Request, res: Response) => {
  try {
    const { description, userId } = req.body;
    const event = await eventService.create(description, userId);
    return res.json(event);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, msg: e });
  }
});

eventsRoutes.put(
  "/api/v1/events/:id",
  validator.body(updateEventSchema),
  validator.params(updateParamsSchema),
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { description, dateTime } = req.body;

      const updateEvent = await eventService.update(id, description, dateTime);

      return res.json(updateEvent);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ status: 400, msg: e });
    }
  }
);

eventsRoutes.delete("/api/v1/events/:id", userAuth, validator.params(deleteParamsSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await eventService.delete(id);
    return res.json({ msg: "Event successfuly deleted!" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, msg: e });
  }
});

eventsRoutes.delete("/api/v1/events", userAuth, async (req: Request, res: Response) => {
  try {
    const dayOfTheWeek = req.query.dayOfTheWeek as string | undefined;

    if (dayOfTheWeek) {
      const deleteCount = await eventService.deleteByCreatedAt(dayOfTheWeek);

      return res.status(200).json({ msg: `Events Deleted: ${deleteCount}` });
    }
    return res.json({ msg: "Unable to delete event!" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, msg: e });
  }
});

export default eventsRoutes;
