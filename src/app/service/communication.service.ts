import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor() { }
  public expanded = false;

  toggleSidenav()  {
    this.expanded = !this.expanded;
  }

  public getNotes() {

  }
}
