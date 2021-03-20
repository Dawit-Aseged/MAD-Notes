import { CommunicationService } from './../../service/communication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  hidden = false;
  constructor(public commService: CommunicationService) { }

  ngOnInit(): void {
    this.commService.getNewNoteChangedListener()
      .subscribe(status => {
        this.hidden = status;
      })
  }

  closeClick(){
    this.commService.hideNewNote(true);
  }

}
