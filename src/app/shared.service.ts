import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //---------------------------USERS CHOICE---------------------------------//
  selectedProject!: any;
  onSelect(project: any) {
    this.selectedProject = project;
  }
//------------------------------------------------------------------------//

  subject = new Subject<any>();

  //repos component

  First_Func() {
    this.subject.next (this.getFirst_Func);
  }

  getFirst_Func() : Observable<any> {
    return this.subject.asObservable()
  }
  //repos component end
  
  constructor() { }
}
