import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss, MatSnackBarRef } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

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

  // This function shows a confirmation message using a snackbar and returns an Observable<boolean>
  showConfirmation(message: string): Observable<boolean> {
    // Create a new Observable<boolean>
    return new Observable<boolean>((observer) => {
      // Open a snackbar with the given message and 'Yes' action button
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Yes', {
        duration: 0, // Snackbar will stay open until user interacts
        panelClass: ['confirmation-snackbar'],
        ...this.position
      });

      // Listen for the action button click
      snackBarRef.onAction().subscribe(() => {
        // If the action button is clicked, emit true and complete the Observable
        observer.next(true);
        observer.complete();
      });

      // Listen for the dismiss action
      snackBarRef.afterDismissed().subscribe((dismiss: MatSnackBarDismiss) => {
        // If the snackbar is dismissed without clicking the action button, emit false and complete the Observable
        if (!dismiss.dismissedByAction) {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
