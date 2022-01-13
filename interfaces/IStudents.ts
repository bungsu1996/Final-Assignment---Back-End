import IClass from "./IClass";
import IScore from "./IScore";

interface IStudents {
    nis: Number;
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    classes: IClass;
    score: Array<IScore>;
}

export default IStudents;
