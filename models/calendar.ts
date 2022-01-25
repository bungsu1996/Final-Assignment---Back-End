import { model, Model, Schema } from "mongoose";
import ICalendar from "../interfaces/ICalendar";

const calendarSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    link: { type: String },
  },
  { versionKey: false }
);

const Calendar: Model<ICalendar> = model<ICalendar>("calendar", calendarSchema);
export default Calendar;
