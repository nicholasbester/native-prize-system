import { Validators } from '@angular/forms';

export class User {
    name: string;
    surname: string;
    email: string;
    cellNumber: string;
    venue: string;
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
            label: 'Venue',
            name: 'venue',
            formBuilder: ['No selection',  Validators.required],
            type: 'select',
            placeholder: 'Select a venue',
            dropdown: [
                { name:"No selection" },
                { name:"Port Elizabeth" },
                { name:"East London" },
                { name:"Boksburg" },
                { name:"Emperors Palace" },
                { name:"Hatfield" },
                { name:"Mall@55" },
                { name:"Menlyn" },
                { name:"Meyersdal" },
                { name:"Midrand" },
                { name:"Newtown Junction" },
                { name:"Northriding" },
                { name:"Randburg" },
                { name:"Rivonia" },
                { name:"Rosebank" },
                { name:"Sandton" },
                { name:"Soweto" },
                { name:"Town Square" },
                { name:"Woodmead" },
                { name:"Umhlanga Ridge" },
                { name:"Nelspruit" },
                { name:"Witbank" },
                { name:"Table View" }
            ]
        },
        {
            label: 'Marketing',
            name: 'marketing',
            formBuilder: [true],
            type: 'checkbox',
            placeholder: 'Receive marketing information?'
        }
    ]

    constructor(name:string, surname:string, email:string, venue:string, cellNumber: string, marketing: boolean) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.venue = venue;
        this.cellNumber = cellNumber;
        this.marketing = marketing;
    }
}