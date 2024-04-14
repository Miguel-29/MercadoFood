import { Injectable } from '@angular/core';
import { productCarModel, productModel, orderModel, orderClass, detailOrder } from '../models/catalogModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BdTempoService {
  private products: productModel[] = [{
    id: 1,
    name: "leche",
    description: "Cada leche cuenta con 1 litro de contenido",
    price: 1000,
    quantityAvailable: 10,
  },{
    id: 2,
    name: "huevos",
    description: "Contiene 30 huevos",
    price: 1500,
    quantityAvailable: 50,
  },{
    id: 3,
    name: "pan",
    description: "Un pan familiar",
    price: 100,
    quantityAvailable: 25,
  },{
    id: 4,
    name: "aceite",
    description: "Cada aceite cuenta con 3 litro de contenido",
    price: 3000,
    quantityAvailable: 100,
  },{
    id: 5,
    name: "aceite vegetal",
    description: "Cada aceite vegetal cuenta con 3 litro de contenido",
    price: 3000,
    quantityAvailable: 100,
  },{
    id: 6,
    name: "mantequilla",
    description: "1000 gramos de producto",
    price: 500,
    quantityAvailable: 80,
  }]

  private orders: orderModel[] = []

  getSimpleProducts(): Observable<productModel[]> {
    return new Observable<productModel[]>(observer => {
      try {
        observer.next(this.products)
      } catch {
        observer.error("Sucedio algo inesperado")
      }      
    });
  }

  setSimpleProducts(product: productModel): Observable<productModel[]> {
    return new Observable<productModel[]>(observer => {
      try {
        let index = this.products.findIndex(e => e.id == product.id);
        if (index >= 0) {  
          this.products[index] = product;
        } else {
          this.products.push({...product, id: this.products.length+1});
        }
        observer.next(this.products);
      } catch {
        observer.error("Sucedio algo inesperado");
      }
    });
  }

  removeSimpleProducts(product: productModel): Observable<productModel[]> {
    return new Observable<productModel[]>(observer => {
      try {
        this.products = this.products.filter(e => e.id !== product.id)
        observer.next(this.products)
      } catch {
        observer.error("Sucedio algo inesperado")
      }
    });
  }

  setCar(data: productCarModel[]) {
    return new Observable<any>(observer => {
      try {
        let detail: detailOrder = {
          dateOrder: new Date(),
          status: 'Transportando mercancia',
        };
        let order: orderModel = new orderClass(data, detail);
        this.orders.push(order);
        observer.next(order);
      } catch {
        observer.error("Sucedio algo inesperado")
      }
    });
  }

  getOrders() {
    return new Observable<any>(observer => {
      try {
        observer.next(this.orders);
      } catch {
        observer.error("Sucedio algo inesperado")
      }
    });
  }

}
