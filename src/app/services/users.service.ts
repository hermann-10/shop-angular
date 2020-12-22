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
        const url = `${environment.API+'authentifier.php?' + environment.API_KEY}` + '&email=' + newUser.email + '&password=' + newUser.password;
        this.httpClient.get(url).subscribe(
          (data: Result)=>{
            if(data.status == 200){
              this.user = data.result; // stocker les données de l'utilisateur
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
        const url = `${environment.API+'authentifier.php?' + environment.API_KEY}` + 
        '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' + newUser.sexe +
        '&firstname=' + newUser.firstname + '&lastname' + newUser.lastname + '&dateBirth=' +
        newUser.dateBirth + '&pseudo=' + newUser.pseudo;

        this.httpClient.get(url).subscribe(
          (data: Result) => {
            if(data.status == 200){
              this.authentifier(newUser);
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

  logout(){

  }
}
