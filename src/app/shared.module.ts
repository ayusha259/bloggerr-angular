import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeDirective } from 'src/shared/resize.directive';

import { TimeSincePipe } from 'src/shared/time-since.pipe';

import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [TimeSincePipe, LoaderComponent, ResizeDirective],
  imports: [CommonModule],
  exports: [CommonModule, TimeSincePipe, LoaderComponent, ResizeDirective],
})
export class SharedModule {}
