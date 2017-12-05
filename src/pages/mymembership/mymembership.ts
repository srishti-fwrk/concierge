import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { MymembershipnewPage } from '../mymembershipnew/mymembershipnew';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the MymembershipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mymembership',
  templateUrl: 'mymembership.html',
})
export class MymembershipPage {
  profile;plann;month;amount;text1;text2;transfer;remaining;used;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http,
              public appsetting: Appsetting,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController,) {
                this. userdetail()
  }
  userdetail(){
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
    Loading.present().then(()=>{
    this.http.post(this.appsetting.myGlobalVar + 'users/user', serialized, options).map(res => res.json()).subscribe(data => {
      Loading.dismiss();
  if(data.msg == "Success" ){ 
    console.log(data)
    this.profile = data.data.User;
    this.plann = data.data.SubscriptionPlan.plan;
    this.text1 = data.data.SubscriptionPlan.text1;
    this.text2 = data.data.SubscriptionPlan.text2;
    this.amount = data.data.SubscriptionPlan.plan_amount;
    this.month = data.data1 
    this.transfer = data.data.User.transfers;
    this.remaining = data.data.User.remaining;
    this.used = data.data.User.used;
   
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
  // changeplan(){
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  //   let options = new RequestOptions({ headers: headers });
  //   //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/subscriptionPlans/membershipplan';
  //   var user_id = localStorage.getItem("USERID")
  //   var postdata = {
  //     userid: user_id
  //   };
  //   console.log(postdata);
  //   var serialized = this.serializeObj(postdata);
  //   // this.Loading.present();
  //   this.http.post(this.appsetting.myGlobalVar + 'subscriptionPlans/checkmembershipplan', serialized, options).map(res => res.json()).subscribe(data => {
  //     // this.Loading.dismiss();
  //     console.log(data)
  //     if (data.status == 1) {
     
  //       this.navCtrl.push(MymembershipnewPage);

  //     }
  //     else{
  //       let toast = this.toastCtrl.create({
  //         message: data.msg,
  //        duration: 3000,
  //        position: 'middle'
  //      });
  //      toast.present();
  //     }

  //   })
    
  // }
  changeplan(){
    this.navCtrl.push(MymembershipnewPage);
  }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MymembershipPage');
  }
  tabPage() {
    this.navCtrl.push(TabsPage);
  }
}
