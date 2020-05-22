export class Student{
    public name: string;
    public age: number;
    public studentId: string;
    public studentMainClass: string;
    constructor(name: string, age: number, studentID: string, studentMainClass: string) {
        this.name = name;
        this.age = age;
        this.studentId = studentID;
        this.studentMainClass = studentMainClass;
    }
};

export class StudentClass {
    public students: Student[] = [];
    public className: string;
    public classCode: string;
    constructor(className: string, classCode: string) {
        this.classCode = classCode;
        this.className = className;
    }

    public addStudent(student:Student) {
        this.students.push(student);
    }
};
