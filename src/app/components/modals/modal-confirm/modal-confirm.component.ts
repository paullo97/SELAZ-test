// Import necessary modules and components
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

// Define the component
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
  // Inject the MatDialogRef to close the dialog
  readonly dialogRef = inject(MatDialogRef<ModalConfirmComponent>);

  // Close the dialog when the 'No' button is clicked
  public onNoClick(): void {
    this.dialogRef.close();
  }

  // Close the dialog and pass 'confirm' as the result when the 'Yes' button is clicked
  public confirm(): void {
    this.dialogRef.close('confirm');
  }
}
