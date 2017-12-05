import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentnewPage } from './paymentnew';

@NgModule({
  declarations: [
    PaymentnewPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentnewPage),
  ],
})
export class PaymentnewPageModule {}
