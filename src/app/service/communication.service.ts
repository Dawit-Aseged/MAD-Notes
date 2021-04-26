import { Note, Todo } from './../notes/note.model';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http"
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private Notes!: Note[];
  private newNoteChanged = new Subject<boolean>();
  private notesUpdated = new Subject<Note[]>();

  constructor(private httpClient: HttpClient) { }
  public expanded = false;
  public newNoteHidden = true;

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

  getNotesUpdates() {
    return this.notesUpdated.asObservable();
  }
  public toggleSidenav()  {

    if(this.newNoteHidden)
      this.expanded = !this.expanded;
  }

  public getNotes() {
    this.httpClient
      .get<{message: string, notes: any}>('http://localhost:3000/api/notes')
      .pipe(map((noteData) => { // We map them to ensure that the data is correctly displayed (id != _id)
        return noteData.notes.map((note: any) => {
          return {
            id: note._id,
            title: note.title,
            content: note.content,
            todos: note.todos,
            dateCreated: note.dateCreated,
            lastUpdated: note.lastUpdated,
            color: note.color
          }
        })
      }))
      .subscribe((transformedNotes) => {
        this.Notes = transformedNotes;
        this.notesUpdated.next([...this.Notes])
      })

  }

  public sendNotes (title: string, content?: string, todos?: [{id: number, content: string, checked: boolean}] ) {
    const Note: Note = {
      id: -1,
      title: title,
      content: content,
      todos: todos,
      dateCreated: new Date(),
      lastUpdated: new Date(),
      color: {r: 54, g: 54, b: 54, a: 1}
    }
    this.httpClient
      .post<{error: number, message: string, value: any}>('http://localhost:3000/api/note', Note)
      .subscribe((responseData) => {
        if(responseData.error == 0) {
          Note.id = responseData.value.id;
          Note.dateCreated = responseData.value.dateCreated;
          Note.lastUpdated = responseData.value.lastUpdated;
          Note.color = responseData.value.color;
          Note.todos = responseData.value.todos;
          this.Notes.push(Note);
          this.notesUpdated.next([...this.Notes])
        }
        console.log(responseData.message);
      })
  }
}
