import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from '../model/products';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { Cart } from './../model/cart';
import { Category } from './../model/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart[] = [];
  cartData;
  categories: Category[];
  categorySub: Subscription;

  constructor(private cartService: CartService, private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;

    this.categorySub = this.categoryService.categorySubject.subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
    this.categoryService.emitCategories();
  }

}
