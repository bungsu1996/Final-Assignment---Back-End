# Final-Assignment---Back-End
-------------------------- INTERFACE ------------------------
1. ref "headmaster"
	a. name: string,
	b. email: string,
	c. password: string,
	d. adress: string,
	e. teacher: any,		=> ref "teachers"
	f. parent_student: any,		=> ref "parent_students"
	g. student: any,		=> ref "students"
	h. study_lesson: any,		=> ref "study_lesson"
	i. schedule: any,		=> ref "schedule"
	j. score: any,			=> ref "score"
	k. grade: any,			=> ref "grade"
	l. homeroom_teachers: any,	=> ref "teachers"

2. ref "teachers"
	a. name: string,
	b. email: string,
	c. password: string,
	d. adress: string,
	e. schedule: any,		=> ref "schedule"

3. ref "students"
	a. name: string,
	b. email: string,
	c. password: string,
	d. adress: string,
	e. class: any,			=> ref "class"
	f. score: any,			=> ref "score"
	g. parent: any, 		=> ref "parent_students"

4. ref "class"
	a. name: string,
	b. homeroom_teachers: any,	=> ref "teachers"
	c. 
	d. students: any,		=> ref "students"
	e. grade: any,			=> ref "grade"

5. ref "schedule"
	a. study_lesson: any,		=> ref "study_lesson"
	b. day: string,
	c. time: string,
	d. time_allocation: number,
	e. class: any,			=> ref "class"

6. ref "parent_students"
	a. father: string,
	b. mother: string,
	c. adress: string,
	d. telphone: string,
	e. student: any,		=> ref "students"
	f. email: string,
	g. password: string,
	h. score: any,			=> ref "students"/ ref "score"
	i. schedule: any,		=> ref "schedule"

7. ref study_lesson
	a. name: string,

8. ref "score"
	a. study_lesson: string,
	b. score: number,

9. ref "grade"
	a. grade/ranking: number,
	b. class: any,			=> ref "class"


------------------------------------------PERHATIKAN------------------------------------

1.  Headmaster		= Kepala sekolah
2.  Teachers 		= Guru
3.  Students		= Siswa
4.  Parent_Students	= Orangtua siswa
5.  Class		= Kelas
6.  Schedule		= Jadwal
7.  Homeroom_Teachers 	= Wali kelas
8.  Study_Lesson	= Mata pelajaran
9.  Score		= Nilai
10. Grade		= Ranking
