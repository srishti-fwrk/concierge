import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the PaymentinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentinfo',
  templateUrl: 'paymentinfo.html',
})
export class PaymentinfoPage {
  profile;plann;month;srcImage;
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.paymentinfo()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  information;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public appsetting: Appsetting,
              public loadingCtrl:LoadingController,
              private toastCtrl: ToastController) {
                this.paymentinfo()
  }
paymentinfo(){
  
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  var id = localStorage.getItem("USERID")
  var postdata = {
    user_id: id
  };
  console.log(postdata);
  var serialized = this.serializeObj(postdata);
  let Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  Loading.present().then(()=>{
  this.http.post(this.appsetting.myGlobalVar + 'subscriptionPlans/paymentinfo',serialized,  options).map(res=>res.json()).subscribe(data=>{
  Loading.dismiss();
  console.log(data)
  if(data.isSucess == 'true'){
   this.information = data.data;
   console.log(this.information) 
   
  }else{
    let toast = this.toastCtrl.create({
      message: data.msg,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
   
  }
   
        })
 
      });

}
serializeObj(obj) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}
ionViewDidLoad() {
  console.log('ionViewDidLoad SigninPage');
  console.log('rahul');
  console.log(window.navigator.onLine);
  if (window.navigator.onLine == true) {
   // alert('Network connection');
  } else {
    //alert('Network connection failed');
   // alert('Network connection failed');
    let toast = this.toastCtrl.create({
      message: 'Network connection failed',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
}
}

}
