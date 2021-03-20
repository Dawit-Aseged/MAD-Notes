import { CommunicationService } from './../service/communication.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { Observable } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  sidenavExpanded = false;
  constructor(private commService: CommunicationService, private breakpointObserver: BreakpointObserver) { }

  toggle() {
    this.commService.toggleSidenav();
  }
  ngOnInit(): void {

  }

  addNewNote() {
    this.commService.hideNewNote(false);
  }

}
