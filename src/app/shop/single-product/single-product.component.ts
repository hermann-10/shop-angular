import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


  constructor(private route: ActivatedRoute, private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"]; //on récupère "l'id" de l'url définit dans le fichier app.module.ts dans les routes
    this.product = this.productService.getProductById(+id); //pour le transformer en entier il faut rajouter le "+" devant l'id
  }

  addCart(product: Products):void{
    this.cartService.addProductToCart(product);
  }
}
