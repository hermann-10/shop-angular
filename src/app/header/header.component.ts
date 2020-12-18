import { Component, OnInit } from '@angular/core';
import { Products } from '../model/products';
import { CartService } from '../services/cart.service';
import { Cart } from './../model/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart[] = [];
  cartData;

  constructor(private cartService: CartService ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
  }

}
