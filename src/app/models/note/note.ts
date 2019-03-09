/**
 * Note used for user to write notes in main page.
 */
export class Note {

  /**
   * Content of the note
   */
  content: string;

  /**
   * Color of the note
   */
  color: string;

  constructor(content: string, color: string = 'white') {
    this.content = content;
    this.color = color;
  }
}
