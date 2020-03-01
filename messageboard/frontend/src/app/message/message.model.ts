export class Message {
  public text: string;
  public owner: string;

  constructor(text: string, owner: string) {
    this.text = text;
    this.owner = owner;
  }
}
