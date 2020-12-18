import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Products } from '../model/products';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Products[] = [];
  prodSub: Subscription;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe( //on écoute si on recoit des donnàes
      (data)=>{
        this.products = data;
      }
    )
  }

}
