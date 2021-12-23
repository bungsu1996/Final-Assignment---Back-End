import { model, Model, Schema } from "mongoose";
import IStudyLesson from "../interface/study_lesson.interface";

const studyLessonSchema = new Schema({
  name: { type: String, required: true },
});

const studyLesson: Model<IStudyLesson> = model<IStudyLesson>("StudyLesson", studyLessonSchema);

export default studyLesson;