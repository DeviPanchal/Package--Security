import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }

  // //------------------------Clearing Message------------------------------
  // messages: string[] = [];

  // add(message: string) {
  //   this.messages.push(message);
  // }

  // clear() {
  //   this.messages = [];
  // }
  // //------------------------------------------------------------------------

  repoName = "https://api.github.com/users/devipanchal"; 
  splitted = this.repoName.split("/"); 
  userName = this.splitted[4]

  PROjectName :any

  getUserInfo() {
    return this.http.get('https://api.github.com/users/' + this.userName);
  }

  // async getUserInfo() : Promise<Observable<any> {
  //   return this.http.get('https://api.github.com/users/' + this.userName);
  // }
  getReposInfo() {
    return this.http.get('https://api.github.com/users/'+ this.userName +'/repos')
  }

   getcontentInfo(Project_Selected : any) {
    this.PROjectName = Project_Selected
    return this.http.get(`https://api.github.com/repos/${this.userName}/${Project_Selected}/contents`)
  }

  getPackageInfo() {
    return this.http.get('https://raw.githubusercontent.com/' + this.userName + '/' + this.PROjectName + '/master/package.json')
  }
}

