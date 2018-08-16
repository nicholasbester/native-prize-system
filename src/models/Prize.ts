export class Prize {
  static RATIO:number = 3; // Every nth item will be a prize. Example a value of 2 provides [prize, try-again, prize] etc...
  name: string;
  quantity: number;

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }

  static setDefaultPrizes(): Array<Prize> {
    return [
      new Prize("Bluetooth earphones", 0),
      new Prize("Small Bluetooth speakers", 0),
      new Prize("Glass set of 2", 0),
      new Prize("Cocktail mixer", 0),
      new Prize("Premium Bacardi swizzle stick", 0),
      new Prize("Flat panel cap", 0),
      new Prize("Ice bucket", 0)
    ];
  }
}
