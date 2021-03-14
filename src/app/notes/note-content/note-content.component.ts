import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.css']
})
export class NoteContentComponent implements OnInit {

  isTodo!: boolean;
  @Input() arrayOfTodo: string[] | undefined;
  @Input() content: string = "Content Not Provided";
  constructor() { }

  ngOnInit(): void {
    // if(this.arrayOfTodo === undefined)
    //   this.isTodo = false;
    // this.isTodo = this.arrayOfTodo?.length != 0;

    // console.log(this.isTodo)
    // console.log(this.arrayOfTodo?.toString)

    this.arrayOfTodo?.forEach(element => {

    });
  }



}
