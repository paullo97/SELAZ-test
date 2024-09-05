import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private position: any = {
    verticalPosition: 'top',
    horizontalPosition: 'right',
  }
  constructor(private snackBar: MatSnackBar)
  { }

  showToast(message: string, action: string = 'OK', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      ...this.position
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      ...this.position
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      ...this.position
    });
  }
}
