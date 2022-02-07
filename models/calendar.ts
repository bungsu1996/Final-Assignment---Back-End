import { model, Model, Schema } from "mongoose";
import ICalendar from "../interfaces/ICalendar";

const calendarSchema = new Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    // endTime: { type: String, requried: true },
    classes: { type: Schema.Types.ObjectId, ref: "class" },
    daysOfWeek: [{ type: String, default: null }],
    allDay: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const Calendar: Model<ICalendar> = model<ICalendar>("calendar", calendarSchema);
export default Calendar;
