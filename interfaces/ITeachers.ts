interface ITeachers {
    email: string;
    password: string;
    fullName: string;
    birthDate: string;
    course: string;
    // teachingHours: {
    //     senin: { class: string; time: string };
    //     selasa: { class: string; time: string };
    //     rabu: { class: string; time: string };
    //     kamis: { class: string; time: string };
    //     jumat: { class: string; time: string };
    // };
}

export default ITeachers;
