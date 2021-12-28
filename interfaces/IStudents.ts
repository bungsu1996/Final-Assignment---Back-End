import IClass from "./IClass";
import IScore from "./IScore";

interface IStudents {
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    classes: IClass;
    score: Array<IScore>;
}

export default IStudents;
