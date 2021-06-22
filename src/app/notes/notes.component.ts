import { Component, Input, OnInit } from '@angular/core';

import { Note, Todo } from './note.model';
import { CommunicationService } from './../service/communication.service';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() note!: Note;

  constructor(private commService: CommunicationService) {
    // If the note is not defined then it sets up an placeholder note
    if (this.note === undefined) {
      this.note = {
        id: -1,
        title: "No Note",
        dateCreated: new Date(Date.now()),
        lastUpdated: new Date(Date.now()),
        color: {
          r: 54,
          g: 54,
          b: 54,
          a: 1
        }
      };
    }
  }

  ngOnInit(): void {

  }

  deleteNote(note: Note) {
    this.commService.deleteNote(note.id);
  }

}
