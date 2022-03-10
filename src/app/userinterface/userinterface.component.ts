import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedserviceComponent} from "../sharedservice/sharedservice.component";
import {Note} from "../sharedservice/sharedservice.component";

@Component({
  selector: 'userinterface',
  templateUrl: './userinterface.component.html'
})
export class UserinterfaceComponent implements OnInit {

  public allNotes: Note[] = []
  public hide = false

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
}
