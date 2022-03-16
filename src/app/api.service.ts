import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
    ) { }

  repoName = environment.repoName_URL; 
  splitted = this.repoName.split("/"); 
  userName = this.splitted[4]

  PROjectName :any
  DependenciesObject: Object = {};
  devDependenciesObject: Object = {};

  private dataSource: BehaviorSubject<object> = new BehaviorSubject<object>({ });
  dependencies: Observable<object> = this.dataSource.asObservable();

  sendData(dependencies: object, devDependencies:object) {
    this.DependenciesObject = dependencies
    this.devDependenciesObject = devDependencies
    
  }

  getUserInfo() {
    return this.http.get(environment.userInfo_URL + this.userName);
  }

  getReposInfo() {
    return this.http.get(environment.userInfo_URL+ this.userName +'/repos')
  }

   getcontentInfo(Project_Selected : any) {
    this.PROjectName = Project_Selected
    return this.http.get(`${environment.userRepo_URL}${this.userName}/${Project_Selected}/contents`)
  }

  getPackageInfo() {
    return this.http.get(environment.packageInfo + this.userName + '/' + this.PROjectName + '/master/package.json')
  }

  to_api(): Observable<any> {

    const obj = {
      Dependencies: this.DependenciesObject, 
      devDependencies: this.devDependenciesObject 
    }
    return this.http.post('http://localhost:2000/fetching_packages', obj);
  }
}

