import { Note } from './../notes/note.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private Notes!: Note[];
  constructor() { }
  public expanded = false;

  toggleSidenav()  {
    this.expanded = !this.expanded;
  }

  public getNotes() {
    // Here we should implement a way to fetch notes from our node backend.
    // But till then we will simply return a list of notes with junk data


    this.Notes = [
      {
        id: 1,
        title: "First title",
        todos: [
          {id: 1, content: "Todo 1", checked: false},
          {id: 2, content: "Todo 2", checked: true},
          {id: 3, content: "Todo 3", checked: false},
        ]
      },
      {
        id: 1,
        title: "Second title",
        todos: [
          {id: 1, content: "Todo 4", checked: false},
          {id: 2, content: "Todo 5", checked: true},
          {id: 3, content: "Todo 6", checked: false},
        ]
      },
      {
        id: 1,
        title: "First title",
        content: "This is the content inside the note"
      },
      {
        id: 1,
        title: "Second title",
        todos: [
          {id: 1, content: "Todo 4", checked: false},
          {id: 2, content: "Todo 5", checked: true},
          {id: 3, content: "Todo 6", checked: false},
        ]
      },
      {
        id: 1,
        title: "First title",
        content: "This is the content inside the note"
      }
    ]

    return this.Notes;
  }
}
