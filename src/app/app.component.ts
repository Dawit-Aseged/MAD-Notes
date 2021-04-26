import { CommunicationService } from './service/communication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note, Todo } from './notes/note.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'MAD Notes';
  noteList:Note[] | undefined;
  private noteSub!: Subscription;
  // The following is to check if our device is in mobile view
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);


  constructor(public commService: CommunicationService, public breakpointObserver: BreakpointObserver) {
  // This fetches the notes
    this.noteSub = this.commService.getNotesUpdates()
    .subscribe((notes: Note[]) => {
        this.noteList = notes;
    })
  }

  ngOnInit() {
    this.commService.getNotes();
  }

  ngOnDestroy() {
    this.noteSub.unsubscribe();
  }
}
