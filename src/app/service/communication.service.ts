import { Note } from './../notes/note.model';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private Notes!: Note[];
  private newNoteChanged = new Subject<boolean>();
  private notesUpdated = new Subject<Note[]>();

  constructor(private httpClient: HttpClient) { }
  public expanded = false;
  public newNoteHidden = false;

  public hideNewNote(status: boolean) {
    if(status === false)
      if(this.expanded == true)
      this.expanded = false;
    this.newNoteHidden = status;
    this.newNoteChanged.next(status);
  }

  getNewNoteChangedListener() {
    return this.newNoteChanged.asObservable();
  }
  public toggleSidenav()  {
    if(this.newNoteHidden)
      this.expanded = !this.expanded;
  }

  public getNotes() {
    // Here we should implement a way to fetch notes from our node backend.
    // But till then we will simply return a list of notes with junk data

    // this.httpClient
    //   .get('http://localhost:3000/api/posts')
    //   .subscribe(())

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
          {id: 1, content: "Todo 4 safsadf dsafsadf sadfsdfsdfd sfasdfa sdfasdfasdfdsaf", checked: false},
          {id: 2, content: "Todo 5", checked: true},
          {id: 3, content: "Todo 6", checked: false},
          {id: 1, content: "Todo 4", checked: false},
          {id: 2, content: "Todo 5", checked: true},
          {id: 3, content: "Todo 6", checked: false},
          {id: 1, content: "Todo 4", checked: false},
          {id: 2, content: "Todo 5", checked: true},
          {id: 3, content: "Todo 6", checked: false},
        ]
      },
      {
        id: 1,
        title: "First title",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam dolorum odio doloremque error et, sequi consequatur repellendus numquam. Tempora fugiat maiores beatae quo soluta aliquam doloremque repellat ipsam id! Magni."
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
