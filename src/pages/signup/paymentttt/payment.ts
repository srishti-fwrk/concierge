import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';


/**
 * Generated class for the CharterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charter',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private payPal: PayPal) {
                this.payment()
  }
payment(){
  var paymentt = localStorage.getItem("payment")
  console.log(paymentt)
this.payPal.init({
  PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
  PayPalEnvironmentSandbox: 'AWkAsL4qT3mbTpCqivlt762uj7tWTJQ3PwNunAR9EpdKmKnIz1Grph2VL3kQ_K5QWvq15vF8tiW57Mfn'
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
    this.payPal.renderSinglePaymentUI(payment).then((dataa) => {
      alert(JSON.stringify(payment))
  alert(JSON.stringify(dataa))
      // Successfully paid

      // Example sandbox response
      //
      // {
      //   "client": {
      //     "environment": "sandbox",
      //     "product_name": "PayPal iOS SDK",
      //     "paypal_sdk_version": "2.16.0",
      //     "platform": "iOS"
      //   },
      //   "response_type": "payment",
      //   "response": {
      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
      //     "state": "approved",
      //     "create_time": "2016-10-03T13:33:33Z",
      //     "intent": "sale"
      //   }
      // }
    }, () => {
      alert("error")
      // Error or render dialog closed without being successful
    });
  }, () => {
    alert("erroe123")
    // Error in configuration
  });
}, () => {
  // Error in initialization, maybe PayPal isn't supported or something else
});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CharterPage');
  }

}
