import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedserviceComponent} from "../sharedservice/sharedservice.component";
import {lastValueFrom} from "rxjs";
import {Note} from "../sharedservice/sharedservice.component";

@Component({
  selector: 'notecreationinterface',
  templateUrl: './notecreationinterface.component.html',
  styleUrls: ['./notecreationinterface.component.css']
})
export class NotecreationinterfaceComponent implements OnInit {

  noteToCreate: Note = {
    index: 0,
    title: "",
    description: "",
    status: "",
    dueDate: new Date().toLocaleDateString()
  };

  hasClickedCreation = false

  constructor(private http: HttpClient, private sharedService: SharedserviceComponent) { }

  ngOnInit(): void {
    this.getHighestIndex()
  }

  public toggle(){
    this.hasClickedCreation = !this.hasClickedCreation
  }
  public async createNote(){
    if(this.noteToCreate.index !== 0 && this.noteToCreate.title !== "" && this.noteToCreate.description !== "" &&
      this.noteToCreate.status !== "" && this.noteToCreate.dueDate !== new Date().toLocaleDateString()){
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
