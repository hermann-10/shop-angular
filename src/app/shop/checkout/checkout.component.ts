import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from './../../model/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart[];
  cartData;

  constructor(private cartService : CartService) { 
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
  }

  ngOnInit(): void {
  }

}
