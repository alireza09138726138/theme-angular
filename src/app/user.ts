export class User {
  name: string;
  id: number;
  daily: string;
  delete: boolean;

  constructor(name: string, id: number, daily: string, isDeleted: boolean) {
    this.name = name;
    this.id = id;
    this.daily = daily;
    this.delete = isDeleted;
  }
}
