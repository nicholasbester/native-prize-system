export class User {
    name: string;
    surname: string;
    email: string;
    cellNumber: string;
    marketing: boolean;

    // This static variable contains the field labels, field types and placeholder text for display on the register page
    static fieldTypes:Array<Object> = [
        {
            label: 'First name',
            type: 'text',
            placeholder: 'Enter your first name'
        },
        {
            label: 'Last name',
            type: 'text',
            placeholder: 'Enter your last name'
        },
        {
            label: 'Email address',
            type: 'email',
            placeholder: 'Enter your email address'
        },
        {
            label: 'Cell number',
            type: 'tel',
            placeholder: 'Enter your cell number'
        },
        {
            label: 'Marketing',
            type: 'checkbox',
            placeholder: 'Receive marketing information?'
        }
    ]

    constructor(name:string, surname:string, email:string, cellNumber: string, marketing: boolean) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.cellNumber = cellNumber;
        this.marketing = marketing;
    }
}