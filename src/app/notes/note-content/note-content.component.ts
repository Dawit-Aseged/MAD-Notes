import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.css']
})
export class NoteContentComponent implements OnInit {

  isTodo: boolean = true;
  @Input() arrayOfTodo: string[] | undefined;
  @Input() content: string | undefined;
  constructor() { }

  ngOnInit(): void {
    if(this.arrayOfTodo === undefined)
      this.isTodo = false;
    if(this.content === "" || this.content === undefined)
      this.content = "Content Not Provided"
  }



}
