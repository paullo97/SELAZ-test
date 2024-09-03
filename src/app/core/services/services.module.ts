import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { UuidService } from './uuid.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
      LocalStorageService,
      UuidService
    ]
})
export class ServicesModule
{ }
