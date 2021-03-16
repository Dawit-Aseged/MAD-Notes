import { Component, Input, OnInit } from '@angular/core';
import { Note, Todo } from './note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() note!: Note;

  constructor() {
    if (this.note === undefined) {
      this.note = {
        id: -1,
        title: "No Note"
      };
    }
  }

  ngOnInit(): void {
    console.log("ALSLSL" + this.note)
  }

}
