import IClocks from "./IClocks";
import ICourses from "./ICourses";
import ITeachers from "./ITeachers";

interface ISchedule {
  hari: string;
  course: ICourses;
  teacher: ITeachers;
  clock: IClocks;
  hourlyTeach: String;
}

export default ISchedule;
