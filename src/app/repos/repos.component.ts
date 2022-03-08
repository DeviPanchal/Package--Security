import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
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
    this.First_Function()
  });
  }
  ngOnInit() {}

  userLoggedIn = true;
  userloggedOut = true;

  //variables
  userInfo: any = {};

  repoInfo: any = {};
  repoInfoArray: any = [];

  contentInfo: any = {};
  contentInfoArray: any = [];

  confirm!: any;
  notconfirm?: boolean;

  PackageInfo: any = {};

  getSingleObjectRepoInfo: any = [];

  dependencies: any = {};
  devDependencies: any = {}

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
    

  }
 
  // 1st method complete

  // The Main functions strats from here...
  First_Function() {
    debugger
    this.api.getUserInfo().subscribe(data => {
      this.userInfo = data;

      //searching....repos_url
      if (this.userInfo?.repos_url) {
        
        this.Second_Function()
      }
      else{
        console.log(false)
      }
    });
  }

  Second_Function() {
    debugger
    this.api.getReposInfo().subscribe(async (data) => {
      this.repoInfo = data;

      // repos_url have arrays of objects
      for (let value of this.repoInfo) {
        this.repoInfoArray = value
        
        //seraching....contents_url
        this.Third_Function()
      }
    });
  }

  Third_Function() {
    debugger
    if (this.repoInfoArray?.contents_url) {
      this.URL()
    }
    else {
      console.log(false)
      // alert("Sorry, but I can't find any Project. It look likes your account contain 0 projects.")

    }
  }

//---------------------------USERS CHOICE---------------------------------//
  selectedProject!: any;
  onSelect(project: any) {
    this.selectedProject = project;
  }
//------------------------------------------------------------------------//


 

//   //After user selected the Project
  Fourth_Function() {
    (this.api.getcontentInfo(this.selectedProject)).subscribe(async (data) => {
     this.contentInfo = data;
     
      // contents_url have array of objects
      for (let id of this.contentInfo) {
        this.contentInfoArray = id
        
        //seraching....name: "package.json"
        this.Fifth_Function()
      }
    })
  }

  Fifth_Function() {
    if (this.contentInfoArray.name == "package.json") {
      this.confirm= this.selectedProject;
      // this.notconfirm = false;

      //At every iteration if value is true "Third_callback" funcion is called
      this.Sixth_Function()
      console.log(true)

    }
    else {
      this.notconfirm = false;
      
      console.log(false)

      // alert('There are no Json Files in this Project...!!')
    }
  } 

  Sixth_Function() {
    this.api.getPackageInfo().subscribe(data => {
    this.PackageInfo = data;
    //Fetching necessary data
    this.dependencies = this.PackageInfo.dependencies;
    this.devDependencies = this.PackageInfo.devDependencies;
      })
  }

  // clear() {
  //   this.api.clear()
  // }
  // methods complete

  

}
