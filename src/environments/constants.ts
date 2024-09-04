import { ModuleWithProviders } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/** Usage to Enable DevTools to see Store Redux */
export const storeTools: Array<ModuleWithProviders<any>> = [
  StoreDevtoolsModule.instrument({
      name: 'SELAZ'
  })
];
