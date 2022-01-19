import IClass from "./IClass";
import IStudents from "./IStudents";

interface IParents {
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    student: IStudents;
    class: IClass;
    role: string;
}

export default IParents;
