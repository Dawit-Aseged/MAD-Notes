import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MAD Notes';

  expanded = false;
  toggle() {
    this.expanded = true;
  }

  todoList = [
    "Todo 1",
    "Todo 2"
  ]
}
