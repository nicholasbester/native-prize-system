import { Validators } from '@angular/forms';

export class User {
    name: string;
    surname: string;
    email: string;
    cellNumber: string;
    marketing: boolean;

    // This static variable contains the field labels, field types and placeholder text for display on the register page
    // The name field should match the name of the public variables used for storing user data
    static fieldTypes:Array<Object> = [
        {
            label: 'First name',
            name: 'name',
            formBuilder: ['', Validators.required],
            type: 'text',
            placeholder: 'Enter your first name'
        },
        {
            label: 'Last name',
            name: 'surname',
            formBuilder: ['', Validators.required],
            type: 'text',
            placeholder: 'Enter your last name'
        },
        {
            label: 'Email address',
            name: 'email',
            formBuilder: ['', Validators.required],
            type: 'email',
            placeholder: 'Enter your email address'
        },
        {
            label: 'Cell number',
            name: 'cellNumber',
            formBuilder: ['', Validators.required],
            type: 'tel',
            placeholder: 'Enter your cell number'
        },
        {
            label: 'Marketing',
            name: 'marketing',
            formBuilder: [true],
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