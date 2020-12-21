import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Products;
  prefixUrlImage = `${environment.prefixUrlImage}`;
  productSub: Subscription;


  constructor(private route: ActivatedRoute, private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    const id = this.route.snapshot.params["id"]; //on récupère "l'id" de l'url définit dans le fichier app.module.ts dans les routes
    this.product = this.productService.getProductById(id);
    this.productSub = this.productService.prodSubject.subscribe(
      (data: Products[]) => {
        this.product = this.productService.getProductById(id);
      }
    );
    this.productService.emitProducts();
  }

  addCart(product: Products):void{
    this.cartService.addProductToCart(product);
  }
}
