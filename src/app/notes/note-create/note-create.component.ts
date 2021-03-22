import { CommunicationService } from './../../service/communication.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  hidden = false;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);


  titleHasFocus = false;
  contentHasFocus = false;
  constructor(public commService: CommunicationService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.commService.getNewNoteChangedListener()
      .subscribe(status => {
        this.hidden = status;
      })
  }

  closeClick(){
    this.commService.hideNewNote(true);
  }

  elementOnFocus(element: string) {
    if(element === "title")
      this.titleHasFocus = true;
    else
      this.contentHasFocus = true;
  }

  elementOnFocusLeave(element: string) {
    if (element === "title")
      this.titleHasFocus = false;
    else
      this.contentHasFocus = false;
  }

  // Add a title length constraint of max 70 min 1 character(s)

}
