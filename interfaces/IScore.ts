import ICourses from "./ICourses";
import ISchoolWorks from "./ISchoolWorks";

interface IScore {
    nameWork: ISchoolWorks;
    course: ICourses;
    nilai: number;
}

export default IScore;
