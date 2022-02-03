import ICalendar from "./ICalendar";
import IClass from "./IClass";
import ICourses from "./ICourses";
import IHomeroom from "./IHomeroom";

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
    homeClass: IHomeroom;
}

export default ITeachers;
