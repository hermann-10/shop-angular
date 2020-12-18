import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products = [];
  prefixUrlImage = `${environment.prefixUrlImage}`;
  prodSub: Subscription;

  constructor(private prodService: ProductsService) { }

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

}
