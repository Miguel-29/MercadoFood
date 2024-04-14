import { Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalService } from '../../../services/modal.service';
import { BdTempoService } from '../../../services/bd-tempo.service';
import { orderModel, productCarModel, productModel } from '../../../models/catalogModel';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [NavbarComponent, MatExpansionModule,MatTabsModule, CommonModule, MatDialogActions, ReactiveFormsModule, MatDialogContent, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatButtonModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeUserComponent {
  displayedColumns: string[] = ['name', 'description', 'price', 'quantityAvailable', 'star'];
  displayedColumnsCar: string[] = ['name', 'description', 'price', 'quantity', 'total'];
  dataSource: MatTableDataSource<productModel> = new MatTableDataSource<productModel>();
  dataSourceCar: MatTableDataSource<productCarModel> = new MatTableDataSource<productCarModel>();
  dataSourceOrder: MatTableDataSource<productCarModel> = new MatTableDataSource<productCarModel>();
  listProductsCar: productCarModel[] = [];
  listOrders: orderModel[] = [];
  
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private modalService: ModalService, private bdTempoService: BdTempoService, private formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.bdTempoService.getSimpleProducts().subscribe(e => {
      this.dataSource = new MatTableDataSource(e);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as any;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addCar(product: productModel, event: Event) {
    event.stopPropagation();
    let item = this.listProductsCar.findIndex(e => e.element.id == product.id);
    if(item >= 0) {
      this.listProductsCar[item] = {...this.listProductsCar[item], quantity: this.listProductsCar[item]['quantity'] + 1}
    } else {
      this.listProductsCar.push({element: product, quantity: 1});
    }
    this.applyTable();
  }

  removeCar(product: productModel, event: Event) {
    event.stopPropagation();
    let item = this.listProductsCar.findIndex(e => e.element.id == product.id);
    if(item >= 0) {
      this.listProductsCar[item] = {...this.listProductsCar[item], quantity: this.listProductsCar[item]['quantity'] - 1}
      if(this.listProductsCar[item].quantity == 0) this.listProductsCar = this.listProductsCar.filter(e => e.element.id !== product.id);
    }
  }

  getQuantity(element: productModel): number {
    let productCar: any;
    productCar = this.listProductsCar.find(e => e.element.id == element.id)
    if(productCar) {
      return productCar.quantity;
    } else {
      return 0;
    };
  };

  applyTable() {
    this.dataSourceCar = new MatTableDataSource(this.listProductsCar);
    this.dataSourceCar.paginator = this.paginator as any;
    this.dataSourceCar.sort = this.sort;    
  }

  showCar(templateRef: any) {
    this.dialog.open(templateRef);
  }

  calcTotal(productCar: productCarModel): number {
    return productCar.element.price * productCar.quantity;
  }

  getTotalCost(items: productCarModel[]) {
    let total: number = 0;
    items.forEach(e => {
      total += this.calcTotal(e);
    });
    return total;
  }

  setCar() {
    this.bdTempoService.setCar(this.listProductsCar).subscribe(e => {
      this.listProductsCar = [];
      this.applyTable();
      this.closeModal();
      this.modalService.open("Pedido realizado", "Se ha generado la orden de compra", "check_circle_outline", "text-primary")
      this.getOrders();
    })
  }

  getOrders() {
    this.bdTempoService.getOrders().subscribe((e: orderModel[]) => {
      console.log(e);      
      this.listOrders = e;
    })
  }

  applyTableOrder(items: productCarModel[]) {
    this.dataSourceOrder = new MatTableDataSource(items);
    this.dataSourceOrder.paginator = this.paginator as any;
    this.dataSourceOrder.sort = this.sort;    
  }

  closeModal() {
    this.dialog.closeAll();
  }

  calcDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }

  log(e: any){
    console.log(e);
    
  }
}
