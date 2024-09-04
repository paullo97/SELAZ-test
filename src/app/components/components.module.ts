import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ListContainerComponent } from './list-container/list-container.component';
@NgModule({
    imports: [
      HeaderComponent,
      ListContainerComponent
    ],
    exports: [
      HeaderComponent,
      ListContainerComponent
    ]
})
export class ComponentsModule
{ }
