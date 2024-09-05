import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { UuidService } from './uuid.service';
import { ToastService } from './toasts.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
      LocalStorageService,
      UuidService,
      ToastService
    ]
})
export class ServicesModule
{ }
