import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { Subject } from 'rxjs';
import { Result } from '../model/result';
import { Users } from '../model/users';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Users;
  isAuth: boolean = false;
  userSubject = new Subject<Users>();

  constructor(private httpClient: HttpClient) { }

  emitUser(): void{
    this.userSubject.next(this.user); //l'utilisateur connecté
  }

  authentifier(newUser: Users){
    return new Promise(
      (resolve, reject) =>{
        const url = `${environment.API+'authentifier.php?API_KEY=' + environment.API_KEY}` + '&email=' + newUser.email + '&password=' + newUser.password;
        this.httpClient.get(url).subscribe(
          (data: Result)=>{
            if(data.status == 200){
              this.user = data.result;
              //this.user = data.args; // stocker les données de l'utilisateur
              this.isAuth = true;
              this.emitUser();
              resolve(data.result);
            }else{
              console.log(data.result);
              reject(data.message);
            }
          }, (error) => {
            console.log('error: ' + error);
            reject(false);
          }
        )
      }
    )
  }
  
  createUser(newUser: Users){
    return new Promise(
      (resolve, reject) => {
        const url = `${environment.API+'createUsers.php?API_KEY=' + environment.API_KEY}` + 
        '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' + newUser.sexe +
        '&firstname=' + newUser.firstname + '&lastname=' + newUser.lastname + '&dateBirth=' +
        newUser.dateBirth + '&pseudo=' + newUser.pseudo;

        console.log('Url : ',url);
        this.httpClient.get<Result>(url).subscribe(
          (data: Result) => {
            console.log(data);
            if(data.status == 200){
              this.authentifier(newUser);
              //this.user = data.result; 
              this.isAuth = true;
              this.emitUser();
              resolve(data.result);
            }else{
              reject(data.message);
            }
          }, 
          (error) =>{
            reject(error)
          }
        )
      }
    )
  }

  logout(): void{
    this.user = null;
    this.isAuth = false;
    this.userSubject = new Subject<Users>();
  }
}
