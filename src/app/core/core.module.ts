import { NgModule } from '@angular/core';
import { ServicesModule } from './services/services.module';
import { StoreModule } from './store/store.module';
@NgModule({
    imports: [
      ServicesModule,
      StoreModule
    ]
})
export class CoreModule
{ }
