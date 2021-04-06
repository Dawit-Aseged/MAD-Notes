import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  isTodo = true;
  constructor(
    public dialogRef: MatDialogRef<NoteCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkChanged(input: HTMLInputElement) {
    input.classList.toggle("strikethrough")
  }

}
