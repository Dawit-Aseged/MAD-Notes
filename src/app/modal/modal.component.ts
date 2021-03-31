import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  constructor(public modalRef: MdbModalRef<ModalComponent>) {}

}
