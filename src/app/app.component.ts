import { CommunicationService } from './service/communication.service';
import { Component, OnInit } from '@angular/core';
import { Note, Todo } from './notes/note.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MAD Notes';
  noteList:Note[];
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);


  constructor(public commService: CommunicationService, public breakpointObserver: BreakpointObserver) {
   this.noteList = commService.getNotes();

  }

  ngOnInit() {
    console.log(this.noteList)
  }
}
