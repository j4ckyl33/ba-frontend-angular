import {Component, OnInit} from '@angular/core';
import {Note, SharedserviceComponent} from "../sharedservice/sharedservice.component";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'noteupdateinterface',
  templateUrl: './noteupdateinterface.component.html'
})
export class NoteupdateinterfaceComponent implements OnInit {

  hide = true
  note: Note = <Note>{}

  constructor(private http: HttpClient, private sharedService: SharedserviceComponent) { }

  ngOnInit(): void {
    this.sharedService.clickedUpdateSource$.subscribe(data => {
      this.hide = false
      this.note = data
    })
  }

  public async clickedUpdate(note: Note) {
    await lastValueFrom(this.http.post<any>("http://localhost:8090/note/updatenote", note))
    this.sharedService.requestDone("createdNote")
    this.hide = true
  }
}
