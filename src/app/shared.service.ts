import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private messageService : MessageService) { }

  subject = new Subject<any>();

  //-------------------repos component-----------------------------//
  Initial_repos() {
    this.subject.next (this.getFirst_Func);
  }

  getFirst_Func() : Observable<any> {
    return this.subject.asObservable()
  }
  //repos component end

  //---------------users choice--------------------------------//

}
