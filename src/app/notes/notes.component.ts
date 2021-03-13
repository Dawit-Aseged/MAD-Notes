import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() title!: string;
  @Input() content!: string;

  noteTitle = "";
  noteContent = "";
  constructor() { }

  ngOnInit(): void {
    this.noteTitle = this.title;
    this.noteContent = this.content;
  }

}
