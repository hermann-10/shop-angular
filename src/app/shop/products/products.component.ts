import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ProductsComponent implements OnInit, OnDestroy {

  products = [];
  prefixUrlImage = `${environment.prefixUrlImage}`;
  prodSub: Subscription;
  currentPage = 0;
  pages = [0,1,2,3,4,5,6,7];

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.prodSub = this.prodService.prodSubject.subscribe( //on écoute si on recoit des donnàes
      (data)=>{
        this.products = this.prodService.getProductByPage(this.currentPage);//data;
      }
    );
    this.prodService.emitProducts();
  }

  ngOnDestroy(){
    this.prodSub.unsubscribe; // se désabonner
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
