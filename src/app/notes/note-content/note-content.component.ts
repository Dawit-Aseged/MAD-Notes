import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

import { Todo } from '../note.model';
@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.css']
})

export class NoteContentComponent implements OnInit {

  isTodo: boolean = true;
  @Input() todoList: Todo[] | undefined;
  @Input() content: string | undefined;
  constructor() {

  }

  ngOnInit(): void {

    if(this.todoList === undefined || this.todoList.length == 0)
      this.isTodo = false;
    if(this.content === "" || this.content === undefined)
      this.content = "Content Not Provided";


  }

  // This is used to change the property of the TODO once
  // the checkbox insde the todo is changed
  toggleCheckbox(todo: Todo) {
    todo.checked = !todo.checked;
    // Make sure to propagate this to the server as well

  }



}
