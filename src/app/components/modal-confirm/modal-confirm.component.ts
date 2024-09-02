import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {
  readonly dialogRef = inject(MatDialogRef<ModalConfirmComponent>);

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.dialogRef.close('confirm');
  }
}
