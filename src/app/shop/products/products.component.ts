import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../services/products.service';
import { Products } from './../../model/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() products: Products[] = [];
  @Input() isPaginate: boolean = true;
  prefixUrlImage = `${environment.prefixUrlImage}`;
  prodSub: Subscription;
  currentPage = 0;
  pages = [0,1,2,3,4,5,6,7];

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
   
  }

  addToCart(product: Products): void{
    this.cartService.addProductToCart(product);
  }

  deleteFromCart(product: Products): void{
    this.cartService.deleteFromCart(product);
  }

  changePage(numberPage: number):void{
    const prod = this.prodService.getProductByPage(numberPage);
    if(prod){
      this.products = prod; 
      this.currentPage = numberPage;
    }
  }

  nextPage(): void{
    const newCurrentPage = this.currentPage +1;
    const prod = this.products = this.prodService.getProductByPage(newCurrentPage);
    if(prod){
      this.products = prod;
      this.currentPage = newCurrentPage;
    }
  }

  prevPage(): void{
    const newCurrentPage = this.currentPage -1;
    const prod = this.products = this.prodService.getProductByPage(newCurrentPage);
    if(prod){
      this.products = prod;
      this.currentPage = newCurrentPage;
    }
  }

}
