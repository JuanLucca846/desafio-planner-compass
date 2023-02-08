import { Schema, model } from "mongoose";

export interface EventsInterface {
  id: string;
  description: string;
  userId: string;
  dateTime: Date;
  createdAt: Date;
}

const eventSchema = new Schema<EventsInterface>({
  id: String,
  description: String,
  userId: String,
  dateTime: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const Events = model<EventsInterface>("Events", eventSchema);
