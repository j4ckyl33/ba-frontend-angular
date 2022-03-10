import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedserviceComponent} from "../sharedservice/sharedservice.component";
import {lastValueFrom} from "rxjs";
import {Note} from "../sharedservice/sharedservice.component";

@Component({
  selector: 'notecreationinterface',
  templateUrl: './notecreationinterface.component.html'
})
export class NotecreationinterfaceComponent implements OnInit {

  hasClickedCreation = false
  noteToCreate: Note = {
    index: 0,
    title: "",
    description: "",
    status: "Idea",
    dueDate: new Date().toLocaleDateString()
  };

  constructor(private http: HttpClient, private sharedService: SharedserviceComponent) { }

  ngOnInit(): void {
    this.getHighestIndex()
  }

  public toggle(){
    this.hasClickedCreation = !this.hasClickedCreation
  }
  public async createNote(){
    if(this.noteToCreate.title !== "" && this.noteToCreate.description !== "" && this.noteToCreate.dueDate !== ""){
      await lastValueFrom(this.http.post<any>("http://localhost:8090/note/createnote", this.noteToCreate))
      this.sharedService.requestDone("createdNote")
      this.hasClickedCreation = false
      this.noteToCreate = {
        index: 0,
        title: "",
        description: "",
        status: "",
        dueDate: new Date().toLocaleDateString()
      }
      this.getHighestIndex()
    }else{
      alert("One or more inputs are missing")
    }
  }

  private getHighestIndex(){
    this.http.get<any>("http://localhost:8090/note/listnotes").subscribe((data: any)=>{
      for(let note of data){
        if(this.noteToCreate.index < note.index){
          this.noteToCreate.index = note.index
        }
      }
      this.noteToCreate.index++
    })
  }
}
