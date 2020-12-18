import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'src/app/model/products';
import { environment } from 'src/environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {

  @Input() products: Products[];
  prefixUrlImage = `${environment.prefixUrlImage}`;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addCart(product: Products):void{
    this.cartService.addProductToCart(product);
  }

}
