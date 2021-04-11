import { CommunicationService } from './../service/communication.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { NoteCreateComponent } from '../notes/note-create/note-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  content?: string;
  todos?: [{_id: number, content: string, checked: boolean}]
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  sidenavExpanded = false;
  constructor(private commService: CommunicationService, private breakpointObserver: BreakpointObserver, public dialog: MatDialog) { }

  toggle() {

    this.commService.toggleSidenav();
  }
  ngOnInit(): void {

  }

  title!: string;
  content!: string;
  information!: DialogData;
  addNewNote() {
    this.commService.hideNewNote(false);
  }

  openDialog(): void {
    this.commService.hideNewNote(false);
    const dialogRef = this.dialog.open(NoteCreateComponent, {
      width: '500px',
      height: "400px",
      data: {title: this.title, content: this.content}
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      // Result could be undefined based on how it is closed
      this.information = result;
      console.log(result);
      this.commService.hideNewNote(true);
      this.commService.sendNotes(result.title, result.content, result.todos)
    });
  }



}

