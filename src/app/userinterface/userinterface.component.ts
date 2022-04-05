import { Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedserviceComponent} from "../sharedservice/sharedservice.component";
import {Note} from "../sharedservice/sharedservice.component";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'userinterface',
  templateUrl: './userinterface.component.html'
})
export class UserinterfaceComponent implements OnInit {

  public allNotes: Note[] = []
  public hide = false
  private note: Note = <Note>{}

  constructor(private http: HttpClient, private sharedService: SharedserviceComponent) { }

  ngOnInit(): void {
    this.getAllNotes()
    this.sharedService.requestDoneSource$.subscribe(msg => {
      this.getAllNotes()
      this.hide = false
    })
  }

  public getAllNotes(){
    this.http.get<any>("http://localhost:8090/note/listnotes").subscribe((data: any)=>{
      this.allNotes = data
    })
  }

  public sendNoteToUpdate(note: Note){
    this.hide = true
    this.sharedService.clickedUpdate(note)
  }

  public async createMassNotes(){
    await lastValueFrom(this.http.post<any>("http://localhost:8090/note/createmassnotes", this.note))
    this.sharedService.requestDone("createdMassNotes")
  }

  public async updateMassNotes(){
    await lastValueFrom(this.http.post<any>("http://localhost:8090/note/updatemassnotes", this.note))
    this.sharedService.requestDone("updatedMassNotes")
  }

  public async deleteMassNotes(){
    await lastValueFrom(this.http.post<any>("http://localhost:8090/note/deletemassnotes", this.note))
    this.sharedService.requestDone("deletedMassNotes")
  }
}
