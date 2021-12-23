import { model, Model, Schema } from "mongoose";
import ISchedule from "../interface/schedule.interface";

const scheduleSchema = new Schema({
  class: { type: Schema.Types.ObjectId, ref: "class", required: true },
  study_lesson: { type: Schema.Types.ObjectId, ref: "study_lesson", required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  time_allocation: { type: String, required: true },
});

const Schedule: Model<ISchedule> = model<ISchedule>("Schedule", scheduleSchema);

export default Schedule;