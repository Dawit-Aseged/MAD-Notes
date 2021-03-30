import { Note } from './../notes/note.model';
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

  getNotesUpdates() {
    return this.notesUpdated.asObservable();
  }
  public toggleSidenav()  {
    if(this.newNoteHidden)
      this.expanded = !this.expanded;
  }

  public getNotes() {
    // Here we should implement a way to fetch notes from our node backend.
    // But till then we will simply return a list of notes with junk data

    this.httpClient
      .get<{message: string, notes: any}>('http://localhost:3000/api/notes')
      .pipe(map((noteData) => {
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
}
