import ICourses from "./ICourses";
import ISchoolWorks from "./ISchoolWorks";

interface IScore {
  nameWork: ISchoolWorks;
  course: ICourses;
  dailyScore: number;
  midtest: number;
  finaltest: number;
  resultScore: number;
}

export default IScore;
