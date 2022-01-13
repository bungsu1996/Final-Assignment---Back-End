import IClass from "./IClass";
import ICourses from "./ICourses";

interface ITeachers {
    nip: Number;
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    course: Array<ICourses>;
    teachClass: Array<IClass>;
    role: String;
}

export default ITeachers;
