import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ReposComponent } from './repos/repos.component';
import { MessageService } from './message.service';
import { BehaviorSubject } from 'rxjs';

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
  private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
  data: Observable<string> = this.dataSource.asObservable();
 
  sendproject_to_repoDetails(data: string) {
  this.dataSource.next(data);
  }
}
