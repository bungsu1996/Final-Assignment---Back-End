import { model, Model, Schema } from "mongoose";
import ISchoolWorks from "../interfaces/ISchoolWorks";

const schoolworkSchema = new Schema(
  {
    nameWork: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const SchoolWork: Model<ISchoolWorks> = model<ISchoolWorks>(
  "schoolwork",
  schoolworkSchema
);

export default SchoolWork;
