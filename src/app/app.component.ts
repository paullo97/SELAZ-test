import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { ToastService } from './core/services/toasts.service';
import { Store } from '@ngrx/store';
import { UsersStore } from './core/store/users/user.store';
import { Observable } from 'rxjs';
import { getUsersListLength } from './core/store/users/user.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreModule,
    ComponentsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public usersListLenght$: Observable<number> = this.usersStore.select(getUsersListLength);

  constructor(
    private readonly usersStore: Store<UsersStore>,
    private readonly toasts: ToastService
  )
  { }

  // This function is called when the component is initialized
  public ngOnInit(): void {
    // Subscribe to the usersListLenght$ observable
    this.usersListLenght$.subscribe((length: number) => {
      // If the length of the users list is 0, show a toast message
      if(length === 0) {
        this.toasts.showToast('You no Have Registered Users, please register one user, and after register Tasks', 'OK', 5000);
      }
    })
  }

}
