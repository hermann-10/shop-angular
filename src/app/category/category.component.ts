import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from '../model/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  products: Products[];
  productSub: Subscription;

  constructor(private route: ActivatedRoute, private ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request)=>{
        this.productSub = this.ProductsService.prodSubject.subscribe(
          (data: Products[])=>{
            const prod = data.filter(product =>{
              return product.Category == +request.id //je rajoute le + devant pour le forcer à être un entier
            });
            this.products = prod;
          }
        );
        this.ProductsService.emitProducts();
      }
    )
  }

  ngOnDestroy(): void{
    this.productSub.unsubscribe();
  }
}
