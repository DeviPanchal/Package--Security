import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PackageSecurity';

  constructor( private shared: SharedService ){  }
  ngOnInit() {
    this.shared.First_Func();
    debugger
  }

  //---------------------------USERS CHOICE---------------------------------//
  selectedProject!: any;
  onSelect(project: any) {
    this.selectedProject = project;
  }
//------------------------------------------------------------------------//
  
}


