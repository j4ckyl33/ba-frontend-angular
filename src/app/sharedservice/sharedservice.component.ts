import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Note = {
  index: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

@Injectable({providedIn: 'root'})
export class SharedserviceComponent {


  private requestDoneSource = new Subject<string>()
  private clickedDeleteSource = new Subject<Note>()
  private clickedUpdateSource = new Subject<Note>()

  requestDoneSource$ = this.requestDoneSource.asObservable();
  clickedDeleteSource$ = this.clickedDeleteSource.asObservable();
  clickedUpdateSource$ = this.clickedUpdateSource.asObservable();

  requestDone(clicked: string) {
    this.requestDoneSource.next(clicked);
  }

  clickedDelete(note: Note) {
    this.clickedDeleteSource.next(note);
  }

  clickedUpdate(note: Note) {
    this.clickedUpdateSource.next(note);
  }
}
