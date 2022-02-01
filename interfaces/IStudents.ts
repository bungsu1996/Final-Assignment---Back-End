import ICalendar from "./ICalendar";
import IClass from "./IClass";
import IParents from "./IParents";
import IScore from "./IScore";

interface IStudents {
    nis: string;
    email: string;
    emailSend: string;
    password: string;
    fullName: string;
    birthDate: string;
    yearAcademic: string;
    classes: IClass;
    score: Array<IScore>;
    schedule: Array<ICalendar>;
    parent: IParents;
    role: string;
}

export default IStudents;
