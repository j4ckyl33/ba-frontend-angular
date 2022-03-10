import {Component, Input, OnInit} from '@angular/core';
import {SharedserviceComponent} from "../sharedservice/sharedservice.component";
import {Note} from "../sharedservice/sharedservice.component";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'notedeletioninterface',
  templateUrl: './notedeletioninterface.component.html'
})
export class NotedeletioninterfaceComponent implements OnInit {

  @Input() note: Note = <Note>{};

  constructor(private sharedService: SharedserviceComponent, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public async clickDelete(note: Note){
    await lastValueFrom(this.http.delete<any>("http://localhost:8090/note/deletenote", {body: note}))
    this.sharedService.requestDone("createdNote")
  }
}
