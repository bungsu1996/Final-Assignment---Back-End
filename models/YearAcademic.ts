import { model, Model, Schema } from "mongoose";
import IYearAcademic from "../interfaces/IYearAcademic";

const yearAcademicSchema = new Schema(
  {
    yearAcademic: { type: String },
  },
  {
    versionKey: false,
  }
);

const YearAcademic: Model<IYearAcademic> = model<IYearAcademic>(
  "yearacademic",
  yearAcademicSchema
);
export default YearAcademic;
