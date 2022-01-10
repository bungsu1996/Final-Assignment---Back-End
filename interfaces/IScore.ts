import ICourses from "./ICourses";
import ISchoolWorks from "./ISchoolWorks";

interface IScore {
  nameWork: ISchoolWorks;
  course: ICourses;
  dailyScore: number;
  testScore: Number;
  finalScore: Number;
}

export default IScore;
