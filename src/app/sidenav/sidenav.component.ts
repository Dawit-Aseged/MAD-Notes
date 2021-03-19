import { CommunicationService } from './../service/communication.service';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';


interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit, OnChanges {
   @ViewChild("drawer") drawer:MatDrawer | undefined;

  // The following is to check if our device is in mobile view
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  // The following tree is used for the sidenav container for the Financial section
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
  constructor(public commService: CommunicationService, private breakpointObserver: BreakpointObserver) {
    this.dataSource.data = TREE_DATA;
  }

  // The following is used to ensure that the side navigation is actually closed
  sidenavClosed() {
    this.commService.expanded = false;
  }


  ngOnChanges(): void {

  }
  ngOnInit(): void {

  }

  // Used to set a common variable in our service that
  // coordinates the opening and closing of our side navigation
  ngAfterViewInit(): void {
    this.drawer?.openedChange.subscribe((opened)=> {
      this.commService.expanded = opened;
    })
  }

}

// This is the tree data that goes inside the side navigation
const TREE_DATA = [
  {
    name: "Financial Activity",
    children: [
      {name: "Usage"},
      {name: "Loans"}
    ]
  }
]
