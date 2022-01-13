import ICourses from "./ICourses";
import ISchoolWorks from "./ISchoolWorks";

interface IScore {
  nameWork: ISchoolWorks;
  course: ICourses;
  dailyScore: number;
  midtest: Number;
  finaltest: Number;
  resultScore: Number;
}

export default IScore;
