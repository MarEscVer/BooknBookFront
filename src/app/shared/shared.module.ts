import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { icons } from './icons/icons';


@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class SharedModule {
  constructor(private readonly library: FaIconLibrary) {
    this.library.addIcons(...icons);
  }
}
