import {
  Component,
  Inject,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

export interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css'],
})
export class NoteCreateComponent {
  noteOptions = [
    { type: 'Note', id: 1 },
    { type: 'Todo', id: 2 },
  ];

  // This is the array that temporarily holds the todos. It is initialized as an empty todo
  todoList = [{ content: '', checked: false }];
  isTodo = false;
  constructor(
    public dialogRef: MatDialogRef<NoteCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  // The following occurs when the button "No Thanks" is pressed
  onNoClick(): void {
    this.dialogRef.close();
  }

  // This occurs when the user changes the type of note (Either Note or Todo)
  selectChanged(event: MatSelectChange) {
    if (event.value == 1) this.isTodo = false;
    else this.isTodo = true;
  }

  //This creates a new todo when enter is clicked
  enterClicked() {
    this.todoList.push({
      content: '',
      checked: false,
    });
  }
}
