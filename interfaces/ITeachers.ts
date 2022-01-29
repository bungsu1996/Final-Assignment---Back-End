import ICalendar from "./ICalendar";
import IClass from "./IClass";
import ICourses from "./ICourses";

interface ITeachers {
    nip: string;
    email: string;
    emailSend: string;
    password: string;
    fullName: string;
    birthDate: string;
    course: Array<ICourses>;
    schedule: Array<ICalendar>;
    teachClass: Array<IClass>;
    role: String;
}

export default ITeachers;
