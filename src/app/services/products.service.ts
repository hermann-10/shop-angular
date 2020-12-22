import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Products } from '../model/products';
import { Result } from '../model/result';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Products [] = [];
  prodSubject = new Subject<Products[]>(); //observable
  numberOfProductByPage = 6;

  constructor(private httpClient: HttpClient) {
    this.getProductsFromServer(); //on initialise les données
  }

  emitProducts(){ //Cette methode sera appelée à chaque fois qu'il y aura une modif sur les tableaux de produit
    this.prodSubject.next(this.products);
  }

  getProductsFromServer(){
    const url = `${environment.API+'products?API_KEY='+environment.API_KEY}`;

    this.httpClient.get(url).subscribe( //Cela nous retourne un observable
      (dataProducts: Result) =>{
        if(dataProducts.status == 200){ //tout est ok, tout s'est bien passé
          this.products = dataProducts.result;
          this.emitProducts(); //On met les données dans l'observable
        }else{  //alors erreur
          console.log("Error : "+dataProducts.message);
        }
      }
    )  
  }

  getProductById(id: number): Products{
    const product = this.products.find(element => element.idProduct == id);
    if(product){
      return product;
    }
    return null;
  }

  getProductByPage(numberPage: number): Products[]{
    const numberOfPage = this.products.length/this.numberOfProductByPage;
    if(numberPage > 0 || numberPage < numberOfPage){
      const prodResult = this.products.slice(numberPage*this.numberOfProductByPage,(numberPage+1)*this.numberOfProductByPage);
      return prodResult;
    }
    return null;
  }
}
