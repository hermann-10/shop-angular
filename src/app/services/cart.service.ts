import { Injectable } from '@angular/core';
import { Products } from '../model/products';
import { Cart } from './../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[] = [];
  cartData = { len:0, cost:0 };

  constructor() {
    this.initCart();
   }

   initCart(): void{
    if(typeof(localStorage) !== 'undefined'){
      const cart = JSON.parse(localStorage.getItem('cart')); //transformer en tableau 
      const cartData = JSON.parse(localStorage.getItem('cartData')); //transformer en tableau
      this.cart = cart ? cart : [];
      this.cartData = cartData ? cartData : { len:0, cost:0 };
    }
   }

  updateDataCart(){
    let len=0;
    let cost=0;

    this.cart.forEach(element => {
      len += element.number;
      cost += element.product.price * element.number;
    });
    this.cartData.len = len;
    this.cartData.cost = cost;
    if(typeof(localStorage) !== "undefined"){ //Si différent, la valeur existe 
      localStorage.setItem('cart', JSON.stringify(this.cart)); //transformation du tableau en chaîne de caractère avec JSON.stringify()
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    }
  }

  addProductToCart(newProduct: Products):void{
    const checkedProduct = this.cart.find(element => element.product == newProduct);

    if(checkedProduct){
      checkedProduct.number++;
    }else{
      const newProductToAdd = {
        number: 1,
        product: newProduct
      };
      this.cart.push(newProductToAdd); //on ajoute le produit au panier
    }
    this.updateDataCart();
  }

  deleteFromCart(productToDelete: Products): void{
    const indexProduct = this.cart.findIndex(element => element.product == productToDelete);

    if(indexProduct != -1){
      if(this.cart[indexProduct].number>1){
        this.cart[indexProduct].number--;
      }else{ //donc égal à 1
        this.cart.splice(indexProduct,1); //on supprime le produit
      }
    }
    this.updateDataCart();
  }

  removeElementOfCart(index: number):void{
    this.cart.splice(index, 1);
    this.updateDataCart();

  }
}
