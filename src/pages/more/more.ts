import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { PaymentinfoPage } from '../paymentinfo/paymentinfo';
import { SigninPage } from '../signin/signin';
import { MembershipplanePage } from '../membershipplane/membershipplane';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { LoadingController } from 'ionic-angular';
import { MymembershipPage } from '../mymembership/mymembership';

import { ThankyouPage } from '../thankyou/thankyou';


import { BookdetailsPage } from '../bookdetails/bookdetails';
/**
 * Generated class for the MorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public app: App,
    public appsetting: Appsetting,
    public loadingCtrl: LoadingController,
    public http: Http,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController) {
   
  }



  membershipplanePage() {
   
    //this.navCtrl.push(MembershipplanePage);
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
  //  Loading.present().then(() => {
      this.http.post(this.appsetting.myGlobalVar + 'users/user', serialized, options).map(res => res.json()).subscribe(data => {
    //    Loading.dismiss();
        if (data.data.User.plan_status == 0 && data.data.User.request == 0) {
       
           this.navCtrl.push(MembershipplanePage);
        }
        else {
          this.app.getRootNav().setRoot(MymembershipPage);
        }

      })
   // });
  }


  public logout() {
    // alert("Logout")
    localStorage.clear();
    let toast = this.toastCtrl.create({
      message: "Logged out",
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    //	this.navCtrl.push(SigninPage);
    this.app.getRootNav().setRoot(SigninPage);


  }
  socailsharing() {
    //alert("strt")

    this.socialSharing.share("Invite friend", null, null, "http://google.com")
      .then(() => {
        //alert("success");
      },
      () => {
        let toast = this.toastCtrl.create({
          message: "failed",
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        //	alert("failed");
      })




  }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  paymentinfoPage() {
    this.navCtrl.push(PaymentinfoPage);
  }
  bookdetailsPage() {
    this.navCtrl.push(BookdetailsPage);
  }
  thankyou() {
    this.navCtrl.push(ThankyouPage);
  }
  mymembershipPage() {
    this.navCtrl.push(MymembershipPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  profilePage() {
    this.navCtrl.push(ProfilePage);
  }
  changepasswordPage() {
    this.navCtrl.push(ChangepasswordPage);
  }
}
