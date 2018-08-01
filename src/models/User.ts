export class User {
    name: string;
    surname: string;
    email: string;
    cellNumber: string;
    marketing: boolean;

    constructor(name:string, surname:string, email:string, cellNumber: string, marketing: boolean) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.cellNumber = cellNumber;
        this.marketing = marketing;
    }
}