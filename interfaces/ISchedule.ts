import IClocks from "./IClocks";
import ICourses from "./ICourses";
import ITeachers from "./ITeachers";

interface ISchedule {
    hari: string;
    course: ICourses;
    teacher: ITeachers;
    clock: IClocks;
}

export default ISchedule;
