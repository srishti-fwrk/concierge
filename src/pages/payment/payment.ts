import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ThankyouPage } from '../thankyou/thankyou';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  plan; amount; fee; paymentnew; txnid; status; trans;
  totalpament
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private payPal: PayPal,
    public http: Http,
    private iab: InAppBrowser,
    public appsetting: Appsetting,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController, ) {
    this.setdata()
    this.trans = this.navParams.get('trans');
    console.log(this.trans)
  }
  setdata() {
    var paymentt = JSON.parse(localStorage.getItem("payment"));
    this.plan = paymentt.plan;
    this.amount = paymentt.plan_amount;
    this.fee = paymentt.registration_fee;
    this.totalpament = parseInt(paymentt.registration_fee) + parseInt(paymentt.plan_amount);
    console.log(this.totalpament)
    this.paymentnew = parseFloat(this.totalpament)
  }
  // payment() {
  //   var planid = localStorage.getItem("planidd")

  //   console.log(planid)
  //   this.payPal.init({
  //     PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
  //     PayPalEnvironmentSandbox: 'AWkAsL4qT3mbTpCqivlt762uj7tWTJQ3PwNunAR9EpdKmKnIz1Grph2VL3kQ_K5QWvq15vF8tiW57Mfn'
  //   }).then(() => {
  //     //alert(this.paymentnew)
  //     this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
  //     })).then(() => {

  //       // alert(this.paymentnew)
  //       let payment = new PayPalPayment(JSON.stringify(this.paymentnew), 'USD', 'Description', 'sale');
  //       this.payPal.renderSinglePaymentUI(payment).then((dataa) => {
  //         // alert(JSON.stringify(payment))
  //         // alert(JSON.stringify(dataa))
  //         this.txnid = dataa.response.id;
  //         // alert(this.txnid)
  //         this.status = dataa.response.state;
  //         this.status = 1;
  //         //payment saved
  //         let headers = new Headers();
  //         headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  //         let options = new RequestOptions({ headers: headers });
  //         var id = localStorage.getItem("USERID")
  //         var aaa = this.navParams.get('planid');
  //         var postdata = {
  //           userid: id,
  //           Subscription_id: planid,
  //           payment_status: this.status,
  //           txn_id: this.txnid,
  //           transfer:this.trans,
  //           totalpayment: this.paymentnew
  //         };
  //         console.log(postdata);
  //         var serialized = this.serializeObj(postdata);
  //         this.http.post(this.appsetting.myGlobalVar + 'subscriptionPlans/payments', serialized, options).map(res => res.json()).subscribe(data => {
  //           this.Loading.dismiss();
  //           console.log(data)
  //          // alert(JSON.stringify(data))
  //           if (data.status == 1) {
  //             //alert(data.msg)
  //             let toast = this.toastCtrl.create({
  //               message: data.msg,
  //               duration: 3000,
  //               position: 'middle'
  //             });
  //             toast.present();

  //             this.navCtrl.push(ThankyouPage)

  //           } else {
  //             let toast = this.toastCtrl.create({
  //               message: data.msg,
  //               duration: 3000,
  //               position: 'middle'
  //             });
  //             toast.present();
  //             // alert(data.msg)
  //           }


  //         })

  //       }, () => {
  //        // alert("error")
  //         // Error or render dialog closed without being successful
  //       });
  //     }, () => {
  //       //alert("erroe123")
  //       // Error in configuration
  //     });
  //   }, () => {
  //     // Error in initialization, maybe PayPal isn't supported or something else
  //   });
  // }
  payment() {
    var planid = localStorage.getItem("planidd")
    var id = localStorage.getItem("USERID")

    var check = this.paymentnew;

    console.log(check);

    var target = "_blank";
    var options = "location=no,hidden=no";
    var browser = this.iab.create('http://rakesh.crystalbiltech.com/paypal/index.php?id=' + encodeURIComponent(this.paymentnew) + '&planid=' + encodeURIComponent(planid) + '&userid=' + encodeURIComponent(id) + '&transfer=' + encodeURIComponent(this.trans), target, options);

    browser.on('loadstart').subscribe((e) => {


      var redirect_uri = e.url.split('cess');


      if (redirect_uri[0] == 'http://rakesh.crystalbiltech.com/paypal/suc') {

        browser.close();
        this.navCtrl.push(ThankyouPage)

      }
    }, err => {

      // alert(err)
    });

  }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  tabPage() {
    this.navCtrl.push(TabsPage);
  }
  thankyouPage() {
    this.navCtrl.push(ThankyouPage);
  }
}
