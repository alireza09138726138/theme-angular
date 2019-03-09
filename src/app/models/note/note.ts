/**
 * Note used for user to write notes in main page.
 */
export class Note {

  /**
   * List of note colors
   * Default color is the first item (white).
   */
  static colors: string[] = [
    'white',
    'info',
    'danger',
    'primary',
    'warning',
    'success',
    'secondary',
  ];

  /**
   * Content of the note
   */
  content: string;

  /**
   * Color of the note
   */
  color: string;

  constructor(content: string, color: string = Note.colors[0]) {
    this.content = content;
    this.color = color;
  }
}
