import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  Component,
  Inject,
  EventEmitter,
  ViewChild,
  ElementRef,
  ViewChildren,
  TemplateRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';



export interface DialogData {
  title: string;
  content?: string;
  todos?: [{id: number, content: string, checked: boolean}]
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

  @ViewChildren('showTodo') todoElementRef!: ElementRef;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  // This is the array that temporarily holds the todos. It is initialized as an empty todo
  // todoList = [{ content: '', checked: false }];
  isTodo = false;
  constructor(
    public dialogRef: MatDialogRef<NoteCreateComponent>,
    private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  // The following occurs when the button "No Thanks" is pressed
  onNoClick(): void {
    this.dialogRef.close();
  }

  // This occurs when the user changes the type of note (Either Note or Todo)
  selectChanged(event: MatSelectChange) {
    if (event.value == 1) this.isTodo = false;
    else {
      this.isTodo = true;
      if(this.data.todos == undefined)
      this.data["todos"] = [{
        id: -1,
        content: '',
        checked: false,
      }]
      // if(this.data.todo!.length == )
    }
      setTimeout(() =>{
        if(this.isTodo)
          document.querySelector<HTMLInputElement>("#titleTodo")!.focus();
        else
          document.querySelector<HTMLInputElement>("#titleNote")!.focus();
      }, 10)

  }

  //This creates a new todo when enter is clicked
  enterClicked(input: HTMLDivElement, todoInput: HTMLInputElement) {
    if (todoInput.value != "" && todoInput.value != undefined) {
      this.data.todos!.push({
        id: -1,
        content: '',
        checked: false,
      });
    }

    // The following ensures that the new element is focused on after it is created
    setTimeout(() => {
      input.querySelector<HTMLInputElement>("#lastElement")!.focus();
    }, 0)
  }


}
