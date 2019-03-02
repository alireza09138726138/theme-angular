export class Note {
  content: string;
  color: string;

  constructor(content: string, color: string = 'white') {
    this.content = content;
    this.color = color;
  }
}
