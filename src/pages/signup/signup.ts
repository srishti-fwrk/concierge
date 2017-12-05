import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { SigninPage } from '../signin/signin';
import { TabsPage } from '../tabs/tabs';
import { MembershipplanePage } from '../membershipplane/membershipplane';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';


/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
public data='';id;token;
public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public appsetting: Appsetting,
   public http:Http,public loadingCtrl:LoadingController,
   private firebase: Firebase,
   private toastCtrl: ToastController
   ) {
  }


 public register(signup){
  this.firebase.getToken()
 .then(token =>{ console.log(`The token is ${token}`)
  this.token = token
  

let headers = new Headers();
headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
let options= new RequestOptions({ headers: headers });
 //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/users/registration';
 if (signup.value.password.indexOf(' ') >= 0) {
  let toast = this.toastCtrl.create({
    message: "Space not allowed",
    duration: 3000,
    position: 'middle'
  });
  toast.present();
   // alert("Space not allowed")
    } else {
var data ={
  first_name:signup.value.name,
  phone:signup.value.phone,
  email:signup.value.email,
  password:signup.value.password,
  cpassword: signup.value.cpassword,
  tokenid: this.token
}
 var Serialized = this.serializeObj(data);
console.log(data);
this.Loading.present();
  this.http.post(this.appsetting.myGlobalVar + 'users/registration', Serialized, options).map(res=>res.json()).subscribe(data=>{
 
this.Loading.dismiss();
if(data.status == 0){
   var data1 ={
  email:signup.value.email,
  password:signup.value.password,
  tokenid: this.token,
  reg_status:1
}
console.log(data1);
var Serialized = this.serializeObj(data1);
  this.http.post(this.appsetting.myGlobalVar + 'users/login', Serialized, options).map(res=>res.json()).subscribe(data=>{

if(data.error == 0){
   this.data = data;
   this.id =  data.data.User.id
   localStorage.setItem("USERID", data.data.User.id);
   this.Loading.dismiss();
  // alert(data.msg);
  // this.navCtrl.push(TabsPage);
}else{
  let toast = this.toastCtrl.create({
    message: data.msg,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
 // alert(data.msg)
} 
     
    })
   this.data = data;
   console.log(this.data);
  // alert(data.msg);
   let toast = this.toastCtrl.create({
    message: data.msg,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
   localStorage.setItem("USER_DATA", JSON.stringify(data));
   this.navCtrl.push(MembershipplanePage);

}
else{
 // alert(data.msg)
  let toast = this.toastCtrl.create({
    message: data.msg,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
}

  
      
     
    })
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
    console.log('ionViewDidLoad SignupPage');
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

    signinPage(){
      
  this.navCtrl.push(SigninPage);
}
  tabPage(){
  this.navCtrl.push(TabsPage);
}
membershipplanePage(){
  this.navCtrl.push(MembershipplanePage);
}

}
