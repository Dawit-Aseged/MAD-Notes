import { Component, Inject, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

export interface DialogData {
  title: string;
  content: string;
}

@Component({
    selector: 'app-note-create',
    templateUrl: './note-create.component.html',
    styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent {

  noteOptions = [
    {type: "Note", id: 1},
    {type: "Todo", id: 2}
  ]
  isTodo = false;
  constructor(
    public dialogRef: MatDialogRef<NoteCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkChanged(input: HTMLInputElement) {
    input.classList.toggle("strikethrough")
  }

  selectChanged(event: MatSelectChange) {
    if(event.value == 1)
      this.isTodo = false;
    else
      this.isTodo = true;
  }
}
