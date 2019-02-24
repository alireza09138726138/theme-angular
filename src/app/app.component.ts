import {Component} from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  username: string;
  daily: string;
  // user: User;
  users: Array<User>;

  constructor() {
    this.title = 'newAngularApp';
    // this.user = new User('Alireza', 'AlirezaMos', 1);
    this.users = [];

    if (localStorage.getItem('userList') !== null) {
      const items = JSON.parse(localStorage.getItem('userList'));

      for (const item of items) {
        this.users.push(new User(item.name, item.id, item.daily, item.delete));
      }

      console.log(this.users)
    }

  }

  saveUsers() {
    localStorage.setItem('userList', JSON.stringify(this.users));
  }

  addUser() {
    this.users.push(new User(this.username, this.users.length + 1, this.daily, false));
    this.saveUsers();
    console.log(this.users);
  }

  delete(user) {
    user.delete = true;
    this.saveUsers();
  }
}

