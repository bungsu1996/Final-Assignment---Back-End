import { model, Model, Schema } from "mongoose";
import IScore from "../interfaces/IScore";

const scoreSchema = new Schema(
    {
        nameWork: { type: Schema.Types.ObjectId, ref: "schoolwork" },
        course: { type: Schema.Types.ObjectId, ref: "course" },
        nilai: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Score: Model<IScore> = model<IScore>("score", scoreSchema);

export default Score;
