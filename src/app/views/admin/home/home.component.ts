import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { productModel } from '../../../models/catalogModel';
import { BdTempoService } from '../../../services/bd-tempo.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent, MatDialogActions, ReactiveFormsModule, MatDialogContent, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatButtonModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeAdminComponent {
  displayedColumns: string[] = ['name', 'description', 'price', 'quantityAvailable', 'star'];
  dataSource: MatTableDataSource<productModel> = new MatTableDataSource<productModel>();
  statusFormNew: boolean = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private modalService: ModalService, private bdTempoService: BdTempoService, private formBuilder: FormBuilder, public dialog: MatDialog) {}

  formProduct: FormGroup = this.formBuilder.group({
    id: [""],
    name: ["", Validators.required],
    description: ["", Validators.required],
    price: ["", Validators.required],
    quantityAvailable: ["", Validators.required],
  })  

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

  addProduct(templateRef: any) {
    this.dialog.open(templateRef);
  }

  closeModal() {
    this.dialog.closeAll();
  }

  saveProduct(e: productModel, b: any) {
    if(!this.formProduct.valid) return
    this.bdTempoService.setSimpleProducts(e).subscribe(e => {
      this.formProduct.reset();
      this.applyTable(e);
      this.dialog.closeAll();
      if(this.statusFormNew) {
        this.modalService.open('Producto guardado', 'Se ha guardado el producto', 'check_circle_outline', 'text-primary');
      } else {
        this.modalService.open('Producto actualizado', 'Se ha actualizado el producto', 'check_circle_outline', 'text-primary');
      }
      this.statusFormNew = true;
    })
  }

  removeProduct(e: productModel) {
    this.bdTempoService.removeSimpleProducts(e).subscribe(e => {
      this.applyTable(e);
      this.modalService.open('Producto removido', 'Se ha removido el producto', 'check_circle_outline', 'text-primary');
    })
  }

  applyTable(data: productModel[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator as any;
    this.dataSource.sort = this.sort;
  }

  editProduct(templateRef: any, element: productModel) {
    this.statusFormNew = false;
    this.formProduct.setValue(element)
    this.dialog.open(templateRef);
  }

  log(e: any) {
    console.log(e);    
  }
}
