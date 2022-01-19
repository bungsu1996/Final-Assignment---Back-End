import IClass from "./IClass";
import IScore from "./IScore";

interface IStudents {
    nis: string;
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    yearAcademic: string;
    classes: IClass;
    score: Array<IScore>;
}

export default IStudents;