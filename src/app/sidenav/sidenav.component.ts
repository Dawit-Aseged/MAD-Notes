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
  // data: string = "";
  // @Input() showSidenav: boolean = false ;
  // showFiller = false;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
  constructor(public commService: CommunicationService, private breakpointObserver: BreakpointObserver) {
    this.dataSource.data = TREE_DATA;
  }

  sidenavClosed() {
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

const TREE_DATA = [
  {
    name: "Financial Activity",
    children: [
      {name: "Usage"},
      {name: "Loans"}
    ]
  }
]
