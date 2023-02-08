import { Events, EventsInterface } from "../domains/model/Events";
import { Model } from "mongoose";

export default class EventService {
  private eventRepository: Model<EventsInterface>;

  constructor() {
    this.eventRepository = Events;
  }

  async find(): Promise<EventsInterface[]> {
    return this.eventRepository.find();
  }

  async findById(id: string): Promise<EventsInterface> {
    return this.eventRepository.findById(id);
  }

  async findByCreatedAt(date: String): Promise<EventsInterface[]> {
    const startDate = new Date(date.toString()).toISOString();
    const endDate = new Date(`${date} 23:59:59`).toISOString();

    return this.eventRepository.find({ createdAt: { $gt: startDate, $lt: endDate } });
  }

  async create(description: string, userId: string) {
    try {
      const checkDescription = await this.eventRepository.findOne({ description: description });

      if (checkDescription) {
        throw "A Event with this description already exists!";
      }

      const event = new Events({
        description,
        userId,
      });

      await event.save();

      return event;
    } catch (e) {
      const msg = `Unable to create event: ${e}`;
      console.error(msg);
      throw msg;
    }
  }

  async update(id: string, description, dateTime) {
    try {
      let updateEvent = await this.eventRepository.findById(id);
      if (!updateEvent) {
        throw "Id not found!";
      }

      await updateEvent.updateOne({ description: description, dateTime: dateTime });

      return await this.findById(id);
    } catch (e) {
      const msg = `Error to update event: ${e}`;
      console.error(msg);
      throw msg;
    }
  }

  async delete(id: string) {
    try {
      const checkEvent = await this.eventRepository.findById(id);

      if (!checkEvent) {
        throw "Event not found!";
      }

      await this.eventRepository.findByIdAndDelete(id);
    } catch (e) {
      const msg = `Error to delete event: ${e}`;
      console.error(msg);
      throw msg;
    }
  }

  async deleteByCreatedAt(date: String): Promise<number> {
    try {
      const startDate = new Date(date.toString()).toISOString();
      const endDate = new Date(`${date} 23:59:59`).toISOString();

      const { deletedCount } = await this.eventRepository.deleteMany({ createdAt: { $gt: startDate, $lt: endDate } }).exec();
      return deletedCount;
    } catch (e) {
      const msg = `Error to delete event: ${e}`;
      console.error(msg);
      throw msg;
    }
  }
}
