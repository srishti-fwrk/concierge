import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentinfoPage } from './paymentinfo';

@NgModule({
  declarations: [
    PaymentinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentinfoPage),
  ],
})
export class PaymentinfoPageModule {}
