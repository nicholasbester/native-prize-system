export class Prize {
    name: string;
    description: string;
    quantity: number;
    winRatio: number;

    constructor (name: string, description: string, quantity: number, winRatio: number) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.winRatio = winRatio;
    }
}