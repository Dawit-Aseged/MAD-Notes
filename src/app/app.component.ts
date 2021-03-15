import { Component } from '@angular/core';
import { Todo } from './notes/note.model';

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


  todoList: Todo[] = [
    {id: 1, content: "Todo 1", checked: false},
    {id: 2, content: "Todo 2", checked: true},
    {id: 3, content: "Todo 3", checked: false},

  ]
}
