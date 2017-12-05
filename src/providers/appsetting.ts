import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Appsetting provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Appsetting {
 myGlobalVar: string ='http://rakesh.crystalbiltech.com/bookride/api/'; //shop/shippingaddress
  constructor(public http: Http,private toastCtrl: ToastController,) {
    console.log('Hello Appsetting Provider');
   // this.ionViewDidEnter();
  }
  // ionViewDidEnter() {
  //   console.log('rahul');
  //   console.log(window.navigator.onLine);
  //   if (window.navigator.onLine == true) {
  //    // alert('Network connection');
  //   } else {
  //     //alert('Network connection failed');
  //    // alert('Network connection failed');
  //     let toast = this.toastCtrl.create({
  //       message: 'Network connection failed',
  //       duration: 3000,
  //       position: 'middle'
  //     });
  //     toast.present();
  //   }

  // }
}
