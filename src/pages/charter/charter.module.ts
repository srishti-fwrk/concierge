import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharterPage } from './charter';

@NgModule({
  declarations: [
    CharterPage,
  ],
  imports: [
    IonicPageModule.forChild(CharterPage),
  ],
})
export class CharterPageModule {}
