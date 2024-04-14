import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialogRef?: MatDialogRef<ModalComponent, any>

  constructor(public dialog: MatDialog,) {
  }

  open(title: string, text: string, icon: string, iconClass: string) {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'app-dialog',
      data: { title: title, text: text, icon: icon, iconClass: iconClass }
    });
  }

  close() {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
