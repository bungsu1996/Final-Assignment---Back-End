import { model, Model, Schema } from "mongoose";
import ISchedule from "../interfaces/ISchedule";

const scheduleSchema = new Schema(
    {
        hari: { type: String, required: true },
        course: { type: Schema.Types.ObjectId, ref: "course" },
        teacher: { type: Schema.Types.ObjectId, ref: "teacher" },
        clock: { type: Schema.Types.ObjectId, ref: "clock" },
    },
    {
        versionKey: false,
    }
);

const Schedule: Model<ISchedule> = model<ISchedule>("schedule", scheduleSchema);

export default Schedule;
