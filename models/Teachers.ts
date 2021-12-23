import { model, Model, Schema } from "mongoose";
import ITeachers from "../interfaces/ITeachers";

const teacherSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    course: { type: String, required: true },
    // teachingHours: {
    //     senin: { class: { type: String }, time: { type: String } },
    //     selasa: { class: { type: String }, time: { type: String } },
    //     rabu: { class: { type: String }, time: { type: String } },
    //     kamis: { class: { type: String }, time: { type: String } },
    //     jumat: { class: { type: String }, time: { type: String } },
    // },
});

const Teacher: Model<ITeachers> = model<ITeachers>("teacher", teacherSchema);
export default Teacher;

// schedule;

// kelas_1: {
//     senin: {
//         [
//             {
//                 jam: "07.00-09.00",
//                 mapel: "Matematika",
//             },
//             {
//                 jam: "09.00-11.00",
//                 mapel: "B. Indonesia",
//             },
//         ];
//     },
//     selasa: {
//         [
//             {
//                 jam: "07.00-09.00",
//                 mapel: "Matematika",
//             },
//             {
//                 jam: "07.00-09.00",
//                 mapel: "Matematika",
//             },
//         ];
//     }
// },
// kelas_2: {
//     senin: {
//         [
//             {
//                 jam: "07.00-09.00",
//                 mapel: "Matematika",
//             },
//             {
//                 jam: "07.00-09.00",
//                 mapel: "Matematika",
//             },
//         ];
//     },
//     selasa: {
//         [
//             {
//                 jam: "07.00-09.00",
//                 mapel: "Matematika",
//             },
//             {
//                 jam: "07.00-09.00",
//                 mapel: "Matematika",
//             },
//         ];
//     }
// }
