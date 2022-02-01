import IClass from "./IClass";
import IStudents from "./IStudents";

interface IParents {
    email: string;
    emailSend: string;
    password: string;
    father: string;
    mother: string;
    birthDate: string;
    student: Array<IStudents>;
    class: IClass;
    role: string;
    status: string;
}

export default IParents;
