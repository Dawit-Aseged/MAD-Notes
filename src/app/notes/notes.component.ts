import { Component, Input, OnInit } from '@angular/core';
import { Todo } from './note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() title!: string;
  @Input() content!: string;
  @Input() arrayOfTodo!: Todo[];

  // Remove inputing title, content and todoList and input a Note itself

  noteTitle = "";
  noteContent = "";
  constructor() { }

  ngOnInit(): void {
    this.noteTitle = this.title;
    this.noteContent = this.content;
  }

}
