import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymembershipPage } from './mymembership';

@NgModule({
  declarations: [
    MymembershipPage,
  ],
  imports: [
    IonicPageModule.forChild(MymembershipPage),
  ],
})
export class MymembershipPageModule {}
