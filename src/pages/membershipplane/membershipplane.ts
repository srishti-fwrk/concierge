import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { PaymentPage } from '../payment/payment';
import { MymembershipPage } from '../mymembership/mymembership';
/**
 * Generated class for the MembershipplanePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membershipplane',
  templateUrl: 'membershipplane.html',
})
export class MembershipplanePage {
  data; plan; planid; trasfer; status;
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.memberplan(),
      this.buyplan()

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'

  });
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public appsetting: Appsetting,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    this.memberplan()
    this.userdetail()
    
  }
  userdetail() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var user_id = localStorage.getItem("USERID")
    var postdata = {
      id: user_id
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    let Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    Loading.present().then(() => {
      this.http.post(this.appsetting.myGlobalVar + 'users/user', serialized, options).map(res => res.json()).subscribe(data => {
        Loading.dismiss();
        console.log(data.data)
        // if (data.data.User.status = !1) {
        //   this.memberplan()
        // } 
        // else {
        //  this.navCtrl.push(MymembershipPage);
        // }

      })
    });
  }
  memberplan() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/subscriptionPlans/membershipplan';
    var user_id = localStorage.getItem("USERID")
    var postdata = {
      id: user_id
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
   // this.Loading.present();
    this.http.post(this.appsetting.myGlobalVar + 'subscriptionPlans/membershipplan', serialized, options).map(res => res.json()).subscribe(data => {
     // this.Loading.dismiss();
      if (data.status == 0) {
        this.data = data;
        this.plan = data.data;
        console.log(this.plan)
        console.log(this.data);
      } else {
        let toast = this.toastCtrl.create({
          message:"there is no plan available",
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      
      }

    })
  }



  selectvalue(A_id, Id) {
    // alert("iurhgiu")
    console.log(A_id, Id);
    this.planid = Id;
    localStorage.setItem('planidd', Id)
    this.trasfer = A_id;

  }



  buyplan() {
   if(this.planid==undefined){
      
      let toast = this.toastCtrl.create({
        message: 'Please select a plan',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
   }else{
    // alert("heufhu")
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var user_id = localStorage.getItem("USERID")
    var postdata = {
      user_id: user_id,
      plan_id: this.planid,
      transfer: this.trasfer
    };
    
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    this.http.post(this.appsetting.myGlobalVar + 'users/planadd', serialized, options).map(res => res.json()).subscribe(data => {
      this.Loading.dismiss();
      console.log(data)
      console.log(data.data.SubscriptionPlan)
      if (data.bit == 0) {
     //   if (data.data.SubscriptionPlan.plan_amount == 0.00) {
          this.data = data;
          this.navCtrl.push(TabsPage);
          
        } 
   //   }
      else {
      var paymentdata =   localStorage.setItem("payment", JSON.stringify(data.data.SubscriptionPlan));
      this.navCtrl.push(PaymentPage, {trans:this.trasfer});
       // this.navCtrl.push(PaymentPage);
      }
      

      
      
      //  // alert("something going wrong")
    
   



    })
    // }
  }

  }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
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
  tabPage() {
    this.navCtrl.push(TabsPage);
  }
  paymentPage() {
    console.log(this.trasfer);
    //this.navCtrl.push(PaymentPage);
    this.navCtrl.push(PaymentPage, {trans:this.trasfer});
  }
  mymembershipPage() {
    this.navCtrl.push(MymembershipPage);
  }

}
