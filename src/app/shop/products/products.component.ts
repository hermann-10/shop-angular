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

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.prodSub = this.prodService.prodSubject.subscribe( //on écoute si on recoit des donnàes
      (data)=>{
        this.products = data;
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

}
