import { HttpClient } from '@angular/common/http';
import { createAttribute } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../model/cart';
import { Result } from '../model/result';
import { Users } from '../model/users';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient, private cartService: CartService) { }

  createOrders(user: Users, cart: Cart[]){
    return new Promise(
      (resolve, reject) => {
        cart.forEach((data) => {
          const price = data.number * data.product.price;
          const url = `${environment.API + "createOrders.php?API_KEY=" + environment.API_KEY}` +
          '&idUser=' + user.idUser + '&idProduct=' + data.product.idProduct + '&quantity=' + data.number +
          '&price=' + price;

          console.log('url createOrders.php?: ', url)
          this.httpClient.get(url).subscribe(
            (response: Result) => {
              if(response.status == 200){
                this.cartService.removeElementOfCart(0);
                if(cart.length == 0){
                  resolve(true);
                }
              }else{
                reject(response.message);
              }
            },
            (error)=>{
              reject("Error: " + error);
            }
          )

        }); // end foreach
      }
    )
  }
}
