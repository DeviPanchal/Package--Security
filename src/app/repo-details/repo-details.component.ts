import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent implements OnInit {

  constructor(
    private shared: SharedService,
    private api: ApiService,
    private location: Location
    ) 
    { }

  ngOnInit(){
    this.Fourth_Function_content_info()
  }

  // variables
  contentInfo: any = {};
  contentInfoArray: any = [];

  PackageInfo: any = {};

  getSingleObjectRepoInfo: any = [];

  dependencies: any = {};
  devDependencies: any = {}

  URLstring: any;
  splitted_URLstring: any;
  projectName: any
  projectNameArray: any[] = []

  selectedProject?: string;
  message: any[] = []
  confirm?: boolean;
  notconfirm?: boolean;

  myStorage = window.localStorage;

  //variables end
 

  //After user selected the Project

  getData() {
    this.shared.data.subscribe(response => {
      this.selectedProject = response
    })
  }


  Fourth_Function_content_info() {
    this.getData();
    (this.api.getcontentInfo(this.selectedProject)).subscribe(async (data) => {
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
          break lable
          
        }
        else {
          // debugger
          this.notconfirm = true;
          this.confirm = false
        }
        // this.Fifth_Function_package_file()
      }
    })
  }

  Sixth_Function_package_fetching() {
    this.api.getPackageInfo().subscribe(data => {
    this.PackageInfo = data;

    //Fetching necessary data
    this.dependencies = this.PackageInfo.dependencies;
    this.devDependencies = this.PackageInfo.devDependencies;
      })
  }

  goBack(): void {
    this.location.back();
  }
  // methods complete
}
