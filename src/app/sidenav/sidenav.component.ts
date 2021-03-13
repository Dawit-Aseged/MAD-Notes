import { CommunicationService } from './../service/communication.service';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit, OnChanges {
   @ViewChild("drawer") drawer:MatDrawer | undefined;
  // data: string = "";
  // @Input() showSidenav: boolean = false ;
  // showFiller = false;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(public commService: CommunicationService, private breakpointObserver: BreakpointObserver) {

  }

  sidenavClosed() {
    console.log("Close")
    this.commService.expanded = false;
  }


  ngOnChanges(): void {

  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.drawer?.openedChange.subscribe((opened)=> {
      this.commService.expanded = opened;
    })
  }

}
