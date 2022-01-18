import ISchedule from "./ISchedule";
import IStudents from "./IStudents";
import ITeachers from "./ITeachers";

interface IClass {
    className: string;
    yearAcademic: number;
    homeTeacher: ITeachers;
    semester: String;
    student: Array<IStudents>;
    schedule: Array<ISchedule>;
}

export default IClass;
