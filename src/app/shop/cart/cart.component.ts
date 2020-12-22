import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../model/cart';
import { environment } from 'src/environments/environment';
import { Products } from 'src/app/model/products';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[] = [];
  cartData;
  prefixUrlImage = `${environment.prefixUrlImage}`;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    console.log('CART: ',this.cart);

  }

  addProduct(product: Products): void {
    this.cartService.addProductToCart(product);
  }

  deleteProduct(product: Products): void{
    this.cartService.deleteFromCart(product);
  }

  deleteDirectlyProduct(productToDelete: Products): void{
 
    this.cartService.deleteWithBtnTrashFromCart(productToDelete);
  }

}
