import { CommunicationService } from './service/communication.service';
import { Component, OnInit } from '@angular/core';
import { Note, Todo } from './notes/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MAD Notes';
  noteList:Note[];


  constructor(public commService: CommunicationService) {
   this.noteList = commService.getNotes();

  }

  ngOnInit() {
    console.log(this.noteList)
  }
}
