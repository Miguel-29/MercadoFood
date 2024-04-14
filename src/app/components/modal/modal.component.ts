import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, text: string, icon: string, iconClass: string}) {
  }
}
