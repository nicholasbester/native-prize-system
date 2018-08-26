export class Prize {
  static RATIO:number = 10;
  name: string;
  slug: string;
  quantity: number;
  imageSource: string;

  constructor(name: string, slug:string, quantity: number, imageSource:string) {
    this.name = name;
    this.slug = slug;
    this.quantity = quantity;
    this.imageSource = imageSource;
  }

  static setDefaultPrizes(): Array<Prize> {
    return [
      new Prize("Bluetooth earphones", "bluetooth-earphones", 0, 'bluetooth-earphones.png'),
      new Prize("Small Bluetooth speaker", "small-bluetooth-speaker", 0, 'small-bluetooth-speaker.png'),
      new Prize("Tech pack", "tech-pack", 0, 'tech-pack.png'),
      new Prize("Flat panel cap", "flat-panel-cap", 0, 'flat-panel-cap.png'),
      new Prize("Cocktail mixer", "cocktail-mixer", 0, 'cocktail-mixer.png'),
      new Prize("Sunglasses", "sunglasses", 0, 'sunglasses.png'),
    ];
  }
}
