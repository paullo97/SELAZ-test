// Import the Injectable decorator from the Angular core module
import { Injectable } from '@angular/core';
// Import the v4 function from the uuid module
import { v4 as uuidv4 } from 'uuid';

// Create a new Injectable class called UuidService
@Injectable({
  // Provide this service at the root level of the application
  providedIn: 'root'
})
export class UuidService {
  // Constructor for the UuidService class
  constructor() { }

  // Method to generate a UUID
  generateUUID(): string {
    // Return a new UUID
    return uuidv4();
  }
}
