import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private location: Location
    ) 
    {
      
     }

  ngOnInit(){
    this.Fourth_Function_content_info()
  }

  // variables
  contentInfo: any = {};
  contentInfoArray: any = [];

  PackageInfo: any = {};

  getSingleObjectRepoInfo: any = [];

  dependencies: any = {};
  devDependencies: any = {};
  
  message: any[] = []
  confirm?: boolean;
  notconfirm?: boolean;
 
  project?: any;
  //variables end
 

  //After user selected the Project

  Fourth_Function_content_info() {
     let projectName = localStorage.getItem('Selected Project Name');
     this.project = projectName;
    (this.api.getcontentInfo(projectName)).subscribe(async (data) => {
     this.contentInfo = data;

     
      // contents_url have array of objects
      lable: for (let id of this.contentInfo) {
        this.contentInfoArray = id
        
        //seraching....name: "package.json"
        if (this.contentInfoArray.name == "package.json") {
          //At every iteration if value is true "Third_callback" funcion is called
          
          this.confirm = true;
          this.notconfirm = false

          // this.Sixth_Function_package_fetching()
          this.Sixth_Function_package_fetching()
          break lable;
          
        }
        else {
          // debugger
          this.notconfirm = true;
          this.confirm = false;
          localStorage.setItem("Dependencies", "null");
          localStorage.setItem("devDependencies", "null");
          
        }
      }
    })
  }

  Sixth_Function_package_fetching() {
    this.api.getPackageInfo().subscribe(data => {
    this.PackageInfo = data;

    //Fetching necessary data
    this.dependencies = this.PackageInfo.dependencies;
    this.devDependencies = this.PackageInfo.devDependencies;
    this.sendNewData(this.dependencies, this.devDependencies)


    // Packages name only
    localStorage.setItem("Dependencies", JSON.stringify(Object.keys(this.dependencies)));
    localStorage.setItem("devDependencies", JSON.stringify(Object.keys(this.devDependencies)));

    // Packages name with version in form of object
    localStorage.setItem("DependenciesObject", JSON.stringify(this.dependencies));
    localStorage.setItem("devDependenciesObject", JSON.stringify(this.devDependencies));

      })
  }

  goBack(): void {
    this.location.back();
    localStorage.removeItem("Dependencies")
    localStorage.removeItem("devDependencies")
  }

  sendNewData(data1: object, data2: object) {
    this.api.sendData(data1, data2);
  }

  Connect_to_api() {
    this.api.to_api().subscribe(() => {
    })
  }

  // methods complete
}
