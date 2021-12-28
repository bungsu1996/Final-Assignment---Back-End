import IClass from "./IClass";
import ICourses from "./ICourses";

interface ITeachers {
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    course: ICourses;
    teachClass: Array<IClass>;
}

export default ITeachers;
