import { NgModule } from '@angular/core';
import { StoreModule as NgStoreModule } from '@ngrx/store';
import { reducers } from './store';
import { storeTools } from '../../../environments/constants';

@NgModule({
  imports: [
    NgStoreModule.forRoot(reducers),
    ...storeTools
  ]
})
export class StoreModule
{ }
