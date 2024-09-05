import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // Define the position of the toast message
  private position: any = {
    verticalPosition: 'top',
    horizontalPosition: 'right',
  }
  // Inject the MatSnackBar service
  constructor(private snackBar: MatSnackBar)
  { }

  // Show a toast message with a given message, action and duration
  showToast(message: string, action: string = 'OK', duration: number = 3000) {
    // Open a snackbar with the given message, action and duration
    this.snackBar.open(message, action, {
      duration: duration,
      // Spread the position object into the snackbar options
      ...this.position
    });
  }

  // Show an error toast message with a given message
  showError(message: string) {
    // Open a snackbar with the given message and close button
    this.snackBar.open(message, 'Close', {
      // Set the duration of the snackbar to 5 seconds
      duration: 5000,
      // Set the panel class of the snackbar to 'error-snackbar'
      panelClass: ['error-snackbar'],
      // Spread the position object into the snackbar options
      ...this.position
    });
  }

  // Show a success toast message with a given message
  showSuccess(message: string) {
    // Open a snackbar with the given message and close button
    this.snackBar.open(message, 'Close', {
      // Set the duration of the snackbar to 3 seconds
      duration: 3000,
      // Set the panel class of the snackbar to 'success-snackbar'
      panelClass: ['success-snackbar'],
      // Spread the position object into the snackbar options
      ...this.position
    });
  }
}
