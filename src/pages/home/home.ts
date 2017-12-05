import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profile;plann;month;srcImage;
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.userdetail()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  constructor(public navCtrl: NavController,
              public http:Http,
              public appsetting: Appsetting,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController,
              public events : Events) {
                this.userdetail()
                this.events.subscribe('tab-t0-0', (data)=>{
                this.userdetail()
                 
                 })

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
 
  this.http.post(this.appsetting.myGlobalVar + 'users/user', serialized, options).map(res => res.json()).subscribe(data => {
  console.log(data)
if(data.msg == "Success" ){ 
  this.profile = data.data.User
  this.plann = data.data.SubscriptionPlan
  this.srcImage=this.profile.image
  //alert(this.srcImage)
  this.month = data.data1 
}else{
  let toast = this.toastCtrl.create({
    message: data.msg,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
 
}
    
  })

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
