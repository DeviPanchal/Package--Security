import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
  providers: [ApiService]
})
export class ReposComponent implements OnInit {

  constructor(
    private api: ApiService,
    private shared: SharedService,
    // private location: Location
    ){
    this.shared.getFirst_Func().subscribe(() =>{
    this.First_Function_repos_url()
  });
    
  }
  ngOnInit() {
    this.First_Function_repos_url();
  }

  //variables
  userInfo: any = {};

  repoInfo: any = {};
  repoInfoArray: any = [];
  
  URLstring: any;
  splitted_URLstring: any;
  projectName: any
  projectNameArray: any[] = []
  
  message: any[] = []

  //variables complete

  //methods
  // 1. For collecting project name 
  URL() {
    this.URLstring = this.repoInfoArray.contents_url
    this.splitted_URLstring = this.URLstring.split("/");
    
    this.projectName = this.splitted_URLstring[5]
    this.projectNameArray.push(this.projectName)
    localStorage.setItem("Users projects name", JSON.stringify(this.projectNameArray));
  }
 
  // 1st method complete

  // The Main functions strats from here...
  First_Function_repos_url() {
    
    this.api.getUserInfo().subscribe(data => {
      
    this.userInfo = data;
    localStorage.setItem("Users Repository Info", JSON.stringify(this.userInfo.repos_url));
      
      //searching....repos_url
      if (this.userInfo?.repos_url) {
        this.Second_Function_repos_info()
      }
      else{
        console.log(false)
      }
    });
  }

  Second_Function_repos_info() {
    
    this.api.getReposInfo().subscribe(async (data) => {
      this.repoInfo = data;

      // repos_url have arrays of objects
      for (let value of this.repoInfo) {
        this.repoInfoArray = value
        

        //seraching....contents_url
        this.Third_Function_content_url()
      }
    });
  }

  Third_Function_content_url() {
    
    if (this.repoInfoArray?.contents_url) {
      this.URL()
    }
    else {
      console.log(false)
      // alert("Sorry, but I can't find any Project. It look likes your account contain 0 projects.")

    }
  }

//---------------------------USERS CHOICE---------------------------------//
  // selectedProject!: any;
  onSelectProject(project: any) {
    // this.projectSend(project)
    localStorage.setItem("Selected Project Name", project)
  }
//------------------------------------------------------------------------//
}
